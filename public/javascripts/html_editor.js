$(function() {
				$('#editControls a').click(function(e) {
					switch($(this).data('role')) {
						case 'h1':
						case 'h2':
						case 'p':
							document.execCommand('formatBlock', false, '<' + $(this).data('role') + '>');
							break;
						default:
							document.execCommand($(this).data('role'), false, null);
							break;
					}
					
				});
				$('.post-comment').click(function(e){
					var data = {
						author:$(this).parent().parent().find('.comment-author').first().val(), 
						reply: $(this).parent().parent().find('.write-comment').first().attr('reply-to'),
						comment: $(this).parent().parent().find('.write-comment').first().text(),
						hidden: $(this).parent().parent().find('.comment-hidden').first().is(':checked'),
						date: new Date()
					};
					var that = $(this);
					$.post('/comment/' + $(this).parent().parent().find('.blogId').first().val(), data, function(msg){
						//console.log(results);
						var results = msg.comments;
						var commentsList = that.parent().parent().find('.comments-list').first();
						commentsList.empty();
						that.parent().parent().parent().find('.comments-count').first().text(' ' + results.length + '条评论');
						for(var i = 0; i < results.length; i++ ){
							var author = results[i].hidden == true ? 'Blog用户': results[i].author;
							var time = moment(results[i].date)
							                    .format('MM/DD/YYYY') === moment()
							                    .format('MM/DD/YYYY') ? moment(results[i].date)
							                    .format('HH:mm:ss'): moment(results[i].date)
							                    .format('YYYY-MM-DD');
							var delateHtml = msg.name === results[i].author? ' <a href="javascript:;" role="delate" comment-id="' + results[i]._id + '"><span class="glyphicon glyphicon-trash delate">删除</span></a>': "";
							if(results[i].reply==''){
								var _h = '<li>' +
							            '<p class="comment-header" comment-author="' + author + '">' + author + '  回复于: ' +
							              '<span>' + time + '</span>' + ' <a href="javascript:;" role="reply"><span class="glyphicon glyphicon-share-alt reply">回复  </span></a>' +
							               delateHtml +
							            '</p>' +
										'<p class="comment-body">' + results[i].comment +'</p>' +
										'<hr>' +
							         '</li>';
							} else {
								var _h = '<li>' +
							            '<p class="comment-header" comment-author="' + author + '">' + author + '  回复: ' + results[i].reply + ' ' +
							              '<span>' + time + '</span>' + ' <a href="javascript:;" role="reply"><span class="glyphicon glyphicon-share-alt reply">回复  </span></a>' +
							              delateHtml +
							            '</p>' +
										'<p class="comment-body">' + results[i].comment +'</p>' +
										'<hr>' +
							         '</li>';
							}
							
							commentsList.append( $(_h) );
						}
						that.parent().parent().find('.write-comment').first().text('');
						that.parent().parent().find('.write-comment').first().attr('reply-to','');
						//replyEvent();
					});
				});
				
				function replyEvent(){
					//delegate可以未来的元素添加事件
					$('.comments-list').delegate("a", "click", function(e){
					
						if(~(e.target.className.indexOf('reply'))){
							console.log(e.target.className);
							var inputBox = $(this).parent().parent().parent().parent().find('.textarea').first();
			                var replyTo = $(this).parent().attr('comment-author');
			                inputBox.focus();
			                inputBox.attr('reply-to', replyTo );
						}

						if(~(e.target.className.indexOf('delate'))){
							console.log($(this).attr('comment-id'));
							var data = {
									commentId: $(this).attr('comment-id')
								};
								var that = $(this);
							$.post('/delate-comment/' + $(this).parent().parent().parent().parent().find('.blogId').first().val(), data, function(msg){
								var results = msg.comments;
								var commentsList = that.parent().parent().parent().parent().find('.comments-list').first();
						        commentsList.empty();
						
						        commentsList.parent().parent().find('.comments-count').first().text(' ' + results.length + '条评论');
						for(var i = 0; i < results.length; i++ ){
							var author = results[i].hidden == true ? 'Blog用户': results[i].author;
							var time = moment(results[i].date)
							                    .format('MM/DD/YYYY') === moment()
							                    .format('MM/DD/YYYY') ? moment(results[i].date)
							                    .format('HH:mm:ss'): moment(results[i].date)
							                    .format('YYYY-MM-DD');
							var delateHtml = msg.name === results[i].author? ' <a href="javascript:;" role="delate" comment-id="' + results[i]._id + '"><span class="glyphicon glyphicon-trash delate">删除</span></a>': "";
							if(results[i].reply==''){
								var _h = '<li>' +
							            '<p class="comment-header" comment-author="' + author + '">' + author + '  回复于: ' +
							              '<span>' + time + '</span>' + ' <a href="javascript:;" role="reply"><span class="glyphicon glyphicon-share-alt reply">回复  </span></a>' +
							              delateHtml +
							            '</p>' +
										'<p class="comment-body">' + results[i].comment +'</p>' +
										'<hr>' +
							         '</li>';
							} else {
								var _h = '<li>' +
							            '<p class="comment-header" comment-author="' + author + '">' + author + '  回复: ' + results[i].reply + ' ' +
							              '<span>' + time + '</span>' + ' <a href="javascript:;" role="reply"><span class="glyphicon glyphicon-share-alt reply">回复  </span></a>' +
							              delateHtml +
							            '</p>' +
										'<p class="comment-body">' + results[i].comment +'</p>' +
										'<hr>' +
							         '</li>';
							}
							
							commentsList.append( $(_h) );
						}
							});
						}
						
					});
				}

				replyEvent();

				$('.vote button').click(function( e ){
					var data = {
						userName: $(this).parent('.vote').first().attr('user-name'),
						isVote: $(this).attr('data-role') === 'up' ? true: false
					};
					var that = $(this);
					$.post('/vote/' + $(this).parent('.vote').first().attr('blog-id'), data, function(results){
						//console.log(results);
						var _text;
						if(results.nameArray.length == 0){
							_text = '还没人赞同';
						} else if(results.nameArray.length == 1){
							_text = results.nameArray[0] + ' 赞同';
						} else if(results.nameArray.length == 2){
							_text = results.nameArray.join(',') + ' 两人赞同';
						} else {
							_text = results.nameArray.join(',') + ' 等人赞同';
						}
						that.parent('.vote').find('button').first().find('p').first().text(results.length);
						that.parent().parent().find('.voter').first().text(_text);
					});
				});

				$('.title').delegate('a','click',function(e){
					$(this).parent().css('display','none');
					$(this).parent().parent().find('.title-modify').first().css('display','block');
				});
				$('.title-modify a').click(function(e){
					$(this).parent().parent().parent().find('.title').first().css('display','block');
					$(this).parent().parent().css('display','none');
				});
				//点击修改文章标题
				$('.title-modify button').click(function(e){
					var data = {
						title: $(this).parent().find('.textarea').first().val()
					};
					var that = $(this);
					$.post('/title_modify/' + $(this).parent().parent().attr('special_id'), data, function(msg){
						console.log(msg);
						that.parent().find('.textarea').first().val(msg.title);
						that.parent().css('display','none');
						that.parent().parent().find('.title').first().html(msg.title);
						that.parent().parent().find('.title').first().css('display','block');
						that.parent().parent().find('.title').first().append('<a href="javascript:;" role="modify"><span class="glyphicon glyphicon-pencil">修改<span></a>');
					});
				});

			});











