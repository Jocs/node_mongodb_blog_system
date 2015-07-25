window.onload = function(){
	var genArticle = document.getElementById('generate-article');
	var forClose = document.getElementById('blog-form-close');
	var postBlog = document.getElementById('post-blog');
	var body = document.getElementsByTagName('body');

	var hiddenBody = document.getElementById('hidden-body');
	var textarea = document.getElementById('editor');

	/*var writeComment = document.getElementsByClassName('write-comment');*/
	/*var showComments = document.getElementsByClassName('show-comments');
	var commentHeader = document.getElementsByClassName('comment-header');*/

	//console.log(showComments);

	genArticle.onclick = function(){
		postBlog.style.display = 'block';
		body[0].style.overflow = 'hidden';
	};
	forClose.onclick = function(){
		postBlog.style.display = 'none';
		body[0].style.overflow = 'auto';
	};
	textarea.onblur = function(){
		var _html = textarea.innerHTML;
		hiddenBody.value = _html;
	};
//以下进行了修改，一篇文章只能有一个id属性。
	/*for(var i = 0; i < writeComment.length; i++){
		//getLabel(writeComment[i]);
		writeComment[i].onfocus = function(){
			var commentWrapper = this.parentNode.getElementsByClassName('comment-wrapper');
			var closeComment = this.parentNode.getElementsByClassName('close-comment')[0];
		    commentWrapper[0].style.display = 'block';
		    closeComment.onclick = function(){
		    	commentWrapper[0].style.display = 'none';
		    };
	    };
	}*/
	/*for(var i = 0; i < showComments.length; i ++){
		showComments[i].onclick = function(){
			//console.log(showComments[i]);
			var getComments = this.parentNode.nextSibling;
			var commentCount = this.getElementsByClassName('comments-count')[0];
			var hiddenComments = this.getElementsByClassName('hidden-comments')[0];
		if(getComments.style.display == 'none'){
			getComments.style.display = 'block';
			commentCount.style.display = 'none';
			hiddenComments.style.display = 'inline-block';
		} else {
			getComments.style.display = 'none';
			commentCount.style.display = 'inline-block';
			hiddenComments.style.display = 'none';
		    }
	    };
	}*/

	/*for(var i = 0; i < commentHeader.length; i ++){
		commentHeader[i].getElementsByTagName('a')[0].onclick = function(){
			var inputBox = this.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('textarea')[0];
			var replyTo = this.parentNode.getAttribute('comment-author');
			inputBox.focus();
			inputBox.setAttribute('reply-to', replyTo );
			//getLabel(inputBox);
		};
	}*/
	/*function getLabel(element){
		element.innerHTML = element.getAttribute('aria-label');
	}*/
	
};













