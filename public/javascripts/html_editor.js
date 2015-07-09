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
						comment: $(this).parent().parent().find('.write-comment').first().text(),
						hidden: $(this).parent().parent().find('.comment-hidden').first().is(':checked'),
						date: new Date()
					};
					var that = $(this);
					$.post('/comment/' + $(this).parent().parent().find('.blogId').first().val(), data, function(results){
						console.log(results);
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
							var _h = '<li>' +
							            '<p class="comment-header">' + author + '  回复于: ' +
							              '<span>' + time + '</span>' +
							            '</p>' +
										'<p class="comment-body">' + results[i].comment +'</p>' +
										'<hr>' +
							         '</li>';
							commentsList.prepend( _h );
						}
						that.parent().parent().find('.write-comment').first().text('');
					});
				});

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
			});











