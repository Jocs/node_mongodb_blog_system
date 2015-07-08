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
				$('#post-comment').click(function(e){
					var data = {
						author:$('#comment-author').val(), 
						comment: $('#write-comment').text(),
						hidden:$('#comment-hidden').is(':checked'),
						date: new Date()
					};
					$.post('/comment/' + $('#blogId').val(), data, function(results){
						console.log(results);
						var commentsList = $('#comments-list');
						commentsList.empty();
						$('#comments-count').text(' ' + results.length + '条评论');
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
						$('#write-comment').text('');
					});
				});
			});