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
				//writecomment获取焦点时候显示“取消”和“发表评论”按钮，并且为取消按钮添加一个隐藏父元素的click事件
				$('#render_blogs').delegate('div','focus',function(e){
					if($(this).hasClass('write-comment')){
						var commentWrapper = $(this).parent().find('.comment-wrapper').first();
						var closeComment = $(this).parent().find('.close-comment').first();
						commentWrapper.css('display','block');
						$('#render_blogs').delegate('a','click',function(e){
							if($(this).hasClass('close-comment')){
								commentWrapper.css('display','none');
							}
						});
					}
				});
				//显示评论和隐藏评论功能
				$('#render_blogs').delegate('a','click',function(e){
					if($(this).hasClass('show-comments')){
						var getComments = $(this).parent().parent().find('.get-comments').first();
						var commentCount = $(this).find('.comments-count').first();
						var hiddenComments = $(this).find('.hidden-comments').first();

						if(getComments.css('display') == 'none'){
							getComments.css('display','block');
							commentCount.css('display','none');
							hiddenComments.css('display','inline-block');
						} else {
							getComments.css('display','none');
							commentCount.css('display','inline-block');
							hiddenComments.css('display','none');
						}
					}
				});

				//发表评论功能
				$('#render_blogs').delegate('button','click',function(e){
					if($(this).hasClass('post-comment')){
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
					}
				});
				
				//实现回复评论和删除评论功能
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
							//删除评论功能
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
				//点赞投票功能的实现。
				$('#render_blogs').delegate('button','click',function(e){
					if($(this).parent().hasClass('vote')){
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
					}
				});
				
				//delegate能够为未来添加的元素添加事件,修改标题的前端实现
				$('#render_blogs').delegate('a','click',function(e){
					if($(this).parent().hasClass('title')&&$(this).attr('role')=='modify'){
						$(this).parent().css('display','none');
					    $(this).parent().parent().find('.title-modify').first().css('display','block');
					} else if($(this).parent().hasClass('cancel-modify')) {
						$(this).parent().parent().parent().find('.title').first().css('display','block');
					    $(this).parent().parent().css('display','none');
					}
				});
				//点击修改文章标题Ajax
				$('#render_blogs').delegate('button','click',function(e){
					if($(this).parent().hasClass('title-modify')){
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
						    that.parent().parent().find('.date-updateAt').first().html(moment().format('HH:mm:ss') + ' ');
					    });
					}
				});
				

				//标签添加和修改的前端交互体验
				$('#render_blogs').delegate('a','click',function(e){
					if($(this).hasClass('tag-modify-ct')){
						var addTag = $(this).parent().find('.tag-modify').first();
					    var tags = $(this).parent().find('.tags span');
					    var aTags = $(this).parent().find('a[role="tag"]');
					    if(addTag.hasClass('hidden')){
						    $(this).html(' <span class="glyphicon glyphicon-ok">完成</span>');
						    addTag.removeClass('hidden');
						    tags.removeClass('hidden');
						    aTags.removeAttr('href');
						    tags.css('cursor','pointer');
					    } else {
						    $(this).html(' <span class="glyphicon glyphicon-pencil">修改</span>');
						    addTag.find('input').first().focus();
						    addTag.addClass('hidden');
						    tags.addClass('hidden');
						    aTags.attr('href','javascript:;');
						    tags.css('cursor','auto');
					    }
					}
				});
				

				//通过ajax删除标签，通过把标签的tag－name发送回服务器，
				//服务器成功删除该标签后返回一个｛delete：true｝的对象
				$('#render_blogs').delegate('span','click',function(e){
					if($(this).parent().attr('role')=='tag'){
						var data = {
						    tag: $(this).parent().attr('tag-name')
					    };
					    var that = $(this);
					    var dateUpdate = $(this).parent().parent().parent().find('.date-updateAt').first();
					    $.post('/tag_delete/'+ $(this).parent().parent().parent().attr('special_id'),data,function(msg){
						    console.log(msg);
						    if(msg.delete && msg.delete === true){
							    that.parent().remove();
							    dateUpdate.html(moment().format('HH:mm:ss') + ' ');
						    } else {
							    alert('服务器故障，未能够删除标签，请刷新后重新删除！');
						    }
					    });
					}
				});

				
				//通过ajax实现添加tag功能。pust
				$('#render_blogs').delegate('a','click',function(e){
					if($(this).hasClass('tag-modify-add')){
						var input = $(this).parent().find('input').first();
					    var data = {
						    tag: input.val()
					    };
					    var that = $(this);
					    var length = $(this).parent().parent().find('a[role="tag"]').length;
					    var tagWarning = that.parent().parent().find('div[role="tag-error"]').first();

					    input.focus(function(e){
						    tagWarning.addClass('hidden');
					    });

					    function showTagError(e, msg){
						    var left = input.parent().position().left;
						    e.removeClass('hidden');
						    e.find('p').first().text(msg);
						    e.find('.tag-error-inner').first().css('left',left + 'px');
					    }

					    if(data.tag !== ''&&length < 5){
						    $.post('/tag_add/' + $(this).parent().parent().attr('special_id'),data,function(msg){
							    if(msg.tag){
								    var _h = '<a role="tag" tag-name="' + msg.tag + '">' + msg.tag + ' <span class="glyphicon glyphicon-remove"></span></a>';
								    that.parent().parent().find('.tags').first().append(_h);
								    that.parent().parent().find('.date-updateAt').first().html(moment().format('HH:mm:ss') + ' ');
							    } else if(msg.add){
								    showTagError(tagWarning,msg.add);
								    //console.log(msg.add);
								    //input.val(msg.add);
							    }		
						    });
					    } else if(data.tag == '') {
						
						    showTagError(tagWarning,'标签不能为空');
						    //input.attr('placeholder','标签不能为空');
					    } else if(length >= 5){
						    showTagError(tagWarning, '标签不能超过5个');
						    //input.val('标签不能超过5个');
					    }
					}
				});
				//修改文章的前端交互呈现，点击“修改文章”按钮，文章变成可修改状态，
				//div（class='content'）元素中增加“contenteditable”特性和增加
				//class属性值content-edit。
				$('#render_blogs').delegate('a','click',function(e){
					if($(this).hasClass('content-modify')){
						var content = $(this).parent().parent().find('.content').first();
					    var contentControl = $(this).parent().parent().find('.content-modify-control').first();
					    var content_html = content.html();
					    var cancel = contentControl.find('a').first();
					    var button = contentControl.find('button').first();
					    var that = $(this);
					    var blogId = $(this).parent().parent().attr('special_id');
					    var dateUpdate = $(this).parent().parent().find('.date-updateAt').first();

					    $(this).addClass('hidden');
					    content.addClass('content-edit');
					    content.attr('contenteditable',true);
					    contentControl.removeClass('hidden');

					    $('#render_blogs').delegate('a','click',function(e){
					    	if($(this).parent().hasClass('content-modify-control')){
					    		content.html(content_html);
						        that.removeClass('hidden');
						        content.removeClass('content-edit');
						        content.removeAttr('contenteditable');
						        contentControl.addClass('hidden');
					    	}
					    });

					    //通过Ajax把更新后的文章内容发送回服务器，服务器进行存储，并把更新后的文章内容返回回来。
					    //客户端接收到返回的文章内容，更新content元素的html。
					    $('#render_blogs').delegate('button','click',function(e){
					    	if($(this).parent().hasClass('content-modify-control')){
					    		var data = {
							        content: content.html()
						        };
						        $.post('/content_modify/' + blogId, data, function(msg){
							        content.html(msg.content);
						            that.removeClass('hidden');
						            content.removeClass('content-edit');
						            content.removeAttr('contenteditable');
						            contentControl.addClass('hidden');
						            dateUpdate.html(moment().format('HH:mm:ss') + ' ');
						        });
					    	}
					    });
					}
				});
				//关注文章功能实现
				$('#render_blogs').delegate('a','click',function(e){
					if($(this).hasClass('watch')){
						var data = {
						    watcher: $('#profile').attr('my-name')
					    };
					    var blogId = $(this).parents('.single-blog').first().attr('special_id');
					    var that = $(this);

					    $.post('/watch/' + blogId, data, function(msg){
						    console.log(msg.watch);
						    if(msg.watch){
							    var _html = ' <span class="glyphicon glyphicon-heart"></span>取消关注';
							    that.html(_html);
						    } else {
							    var _html = ' <span class="glyphicon glyphicon-heart-empty"></span>关注文章';
							    that.html(_html);
						    }
					    });
					}
				});
				
				//实现删除CV介绍功能
				$('#body-right .close_cv').click(function(e){
					$(this).parent().remove();
				});
				//获取下面10篇文章
				$('#get_10').click(function(e){
					var blogNum = $(this).parent().find('.single-blog').length;
					var data = {blogNum:blogNum};
					var blogUl = $('#render_blogs');
					var that = $(this);
					//console.log(blogUl);
					$.post('/get_10',data,function(msg){
						console.log(msg);
						if(msg!=''){
							blogUl.append(msg);
							//contenteditable='contenteditable'改为contenteditable
							blogUl.find('.write-comment').attr('contenteditable',true);
						} else {
							that.html('没有更多');
							that.unbind('click');
						}	
					});
				});
				

			});











