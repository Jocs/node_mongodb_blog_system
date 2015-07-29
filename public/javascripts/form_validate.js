$(function(){
	//验证注册表单
	$('#signup a').click(function(e){
		var form = $(this).parent();
		var firstName = form.find('input[name="name.first"]').first();
		var lastName = form.find('input[name="name.last"]').first();
		var email = form.find('input[type="email"]').first();
		var pass = form.find('input[type="password"]').first();
		var ul = form.find('.msg').first();
		var input = form.find('input');
		input.focus(function(e){
			if(!ul.hasClass('hidden')){
				ul.addClass('hidden');
			};	
		});
		    ul.empty();
		function validateName(){
			if(firstName.val().length == 0||
				lastName.val().length == 0||
				~firstName.val().indexOf(' ')||
				~lastName.val().indexOf(' ')){
				ul.append('<li><span class="glyphicon glyphicon-info-sign"></span> 姓或名不能为空或包含空格</li>');
				return false;
		  	} else {
		  		return true;
		  	}
		}
		function validateEmail(){
			 var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
			if(!pattern.test(email.val())||email.val().length == 0){
				ul.append('<li><span class="glyphicon glyphicon-info-sign"></span> 邮箱地址不正确</li>');
				return false;
			} else {
				return true;
			}
		}
		function validatePass(){
			if(pass.val().length < 6||
				~pass.val().indexOf(' ')){
				ul.append('<li><span class="glyphicon glyphicon-info-sign"></span> 密码小于六个字符或包含空格</li>');
				return false;
			} else {
				return true;
			}
		}
		validateName();
		validateEmail();
		validatePass();
		if(validateName()&&validateEmail()&&validatePass()){
			var data = {
				email: email.val()
			};
			$.post('/validate_email',data,function(msg){
				console.log(msg);
				if(msg.pass){
					form.submit();
				} else {
					ul.append('<li><span class="glyphicon glyphicon-info-sign"></span> 邮箱已被用</li>');
					ul.removeClass('hidden');	
				};
			});

		} else {
			var lastChild = ul.children('li:last-child');
			lastChild.remove();
			ul.removeClass('hidden');
		}		
	});
    //验证发布文章表单
    $('#push_blog').click(function(e){
    	var form = $(this).parent();
    	var title = form.find('input[name="title"]').first();
    	var content = form.find('input[name="content"]').first();
    	var tags = form.find('input[name="tags"]').first();
    	var label = $('#label-explain').parent();
    	var msg = label.html();
    	var input = form.find('input');
    	var divEdit = form.find('#editor').first();
    	var _html = '&nbsp;<span class="glyphicon glyphicon-info-sign"></span> ';

    	input.focus(function(e){
    		label.html(msg);
    	});
    	divEdit.focus(function(e){
    		label.html(msg);
    	});

    	function validateTitle(){
    		if(title.val().length == 0||title.val().length > 40){
    			if(arguments[0] == true){
     				_html +='标题输入不合法.';   				
    			}
    			return false;
    		} else {
    			return true;
    		}
    	}
    	function validateContent(){
    		if(content.val().length < 15){
    			if(arguments[0] == true){
        			_html += '文章内容不能少于15字.';				
    			}
    			return false;
    		} else {
    			return true;
    		}
    	}
    	function validateTags(){
    		if(tags.val().length == 0){
    			if(arguments[0] == true){
     				_html += '标签不能为空.';   				
    			}
    			return false;
    		} else {
    			return true;
    		}
    	}
    	validateTitle(true);
    	validateContent(true);
    	validateTags(true);
    	if(validateTags(false)&&validateContent(false)&&validateTitle(false)){
    		form.submit();
    	} else {
    		label.addClass('orange');
 			label.html(_html);
    	}
    });
});





