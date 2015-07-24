$(function(){
	var timer=null;
	//获取登陆用户关注的所有文章的_id,组成的数组
	var rooms = $('#rooms').val().split(',');
	//获取关注文章通知
	var inform = $('#inform');
	var informHead = $('#inform_right_head');
	var informBody = $('#inform_right_body');
	var ul = $('#inform_left ul');
    var informArrow = $('#inform_arrow');
	//登陆用户通过socket连接服务器
	var socket = io.connect('http://localhost:3000');    
	//登陆用户发送订阅事件，通知服务器需要加入的rooms  
    socket.emit('subscribe', { rooms: rooms });

    //当点击发送评论时，登陆用户向服务器发送一条消息：事件名‘add_comment’,消息内容是评论者和评论的文章_id
    $('.post-comment').click(function(e){
    	socket.emit('add_comment',{
    					date: Date.now(),
						author: $(this).parent().parent().find('.comment-author').first().val(), 
						blogId: $(this).parent().parent().find('.blogId').first().val(),
						comment: $(this).parent().parent().find('.write-comment').first().text()
					});
    });
    //登陆用户接收服务器发来的更新‘关注文章’栏的消息
    socket.on('render_comment',function(data){
    	var _h1 = moment(data.date).format('HH:mm:ss') + ' ' + 
    		data.commenter + ' 评论了<a href="/blogs/' + 
            data.blogId + '" class="single_blog">《' +
    		data.blogTitle + '》</a> 说:';
    	var _h2 = '"' + data.comment + '"';
        if($('#inform_right').hasClass('hidden')){
        	$('#head_left').css('background','#ddd');
        	$('#head_left').css('color','#777');

        	$('#head_right').css('background','#777');
        	$('#head_right').css('color','#ddd');

    	    $('#inform_left').addClass('hidden');
    	    $('#inform_right').removeClass('hidden');
        }
    	
    	clearInterval(timer);
    	console.log(data);
        //清空通知栏
    	informHead.html('');
    	informBody.html('');
        //通知栏显示即时通知消息
    	informHead.html( _h1);
    	informBody.html(_h2);
        informHead.parent().attr('special_id',data.blogId);
    	//render 历史消息
    	var _h = '<li class="inform_left_li" special_id="' +
                   data.blogId + '"><p>' +
                    _h1 + '</p><a href="javascript:;" class="inform_delete">删除</a><p class="inform_left_body">' + 
                   _h2 + '</p></li>';
    	ul.prepend(_h);
        if(!informArrow.hasClass('hidden')){
                informArrow.addClass('hidden');
            }
    	inform.animate({right:'0px',opacity:'0.9'},"slow");
    	timer = setInterval(function(){
    		inform.animate({right:'-430px',opacity:'0.3'},"slow");
            if(informArrow.hasClass('hidden')){
                informArrow.removeClass('hidden');
            }
    	},8000);
    });
    //鼠标悬浮通知栏时候，删除计时器。
    inform.mouseenter(function(e){
    	clearInterval(timer);
    });
    inform.mouseleave(function(e){
    	var self = $(this);
    	timer = setInterval(function(){
    		self.animate({right:'-430px',opacity:'0.3'},"slow");
            if(informArrow.hasClass('hidden')){
                informArrow.removeClass('hidden');
            }
    	},2000);
    });
    //显示历史消息和隐藏历史消息
    $('#inform .inform_head').click(function(e){
    		$(this).css('background','#ddd');
    		$(this).css('color','#777');
    		$(this).siblings().css('background','#777');
    		$(this).siblings().css('color','#ddd');
    		if($(this).attr('id') == 'head_left'){
    			$('#inform_left').removeClass('hidden');
    			$('#inform_right').addClass('hidden');
    		} else {
    			$('#inform_left').addClass('hidden');
    			$('#inform_right').removeClass('hidden');
    		}
    });
    //点击箭头显示通知栏
    informArrow.click(function(e){
        inform.animate({right:'0px',opacity:'0.9'},"slow");
        $(this).addClass('hidden');
    });
    //点击历史消息中的删除按钮删除某条历史消息
    inform.delegate('a','click',function(e){
        if($(this).hasClass('inform_delete')){
            $(this).parent('li').first().remove();
        }
    });


});











