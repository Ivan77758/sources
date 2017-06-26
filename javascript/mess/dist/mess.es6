$( document ).ready(function()
{
    // Получение GET параметров по имени
    $.urlParam = function(name){
      var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1] || 0;
    }

    part_info.init();
    dating_time.init();

    if (tid) {
        visited.action.save(tid);
    }
 });




var add_contact = { 
 
    sync_taglist: 0,
  
    init: function () {              
        $('.add_contact').on('click',add_contact.action.add);                           
    },    
    ajax: {   
        add: function (tag) {                     // alert(tag);        
            $.post('/tag/contact/', { tag: tag });                   
        }           
    },        
    action: {  
        add: function () {                                
            $('.add_contact').removeClass('active');   
            $(this).addClass('active');            
            add_contact.ajax.add($(this).data('tag'));  
        }                                       
    }     
}          



// -- Подстановка дополнительной информации в отправку сообщения ---
var added_info = {

    init: function ()
    {
        if (user_sex && (!user_name || !user_age || !user_city))
        {
            //TODO: реализовать до информацию 
            //$('#form_post_mess').append('<div id="added_info_block"></div>');//{ hash: 15234 },
            //$('#added_info_block').load('/static/htm/added_info.html #added_load', added_info.onload);
        }

    } ,

    onload: function ()
    {
        var post_form = $('#form_post_mess');
        $('#added_info_btn').click( function (){ added_info.show(); });

        added_info.generate();
        added_info.visible();
        name_suggest.init();   // [!!!]
    } ,

    generate: function ()
    {
        var print_age  = user_age  ? user_age  : auto_gen.age(human_age);
        var print_name = user_name ? user_name : auto_gen.name(user_sex);
        var print_city = user_city ? user_city : human_city;

        $('#added_name').val(print_name);
        $('#added_city').val(print_city);
        $('#added_age').val(print_age);
    } ,

    visible: function ()
    {
        added_info.generate();
        $('#added_info_btn').show();
    } ,

    show: function ()
    {
        $('#added_info_btn').hide('blind');
        $('#added_info').show('blind');

    }

}


 
// -- Анкетные данные --        
var anketa = {
    
    init: function () 
    {       
        $('#anketa_collaps_link').on('click', anketa.action.second_info.toggle); 
    },
    
    action: 
    {                               
        second_info: 
        {   
            toggle: function () 
            {                                          
                if ($('#anketa_second_info').is(':visible')) {
                    anketa.action.second_info.hide()
                } else {
                    anketa.action.second_info.show()
                }    
            },
            
            show: function () 
            {                                          
                $('#anketa_second_info').show('blind');  
                anketa.option.collaps.up();    
            },
            
            hide: function () 
            {                                      
                $('#anketa_second_info').hide('blind');      
                anketa.option.collaps.down();
            }  
        }    
    } ,
    
    option: 
    {                               
        collaps: 
        {
            up: function () 
            {      
                $('#anketa_collaps_link').text('Свернуть анкету');   
            },
            
            down: function () 
            {                                               
                $('#anketa_collaps_link').text('Развернуть анкету'); 
            }  
        } 
    } 
    
}



// -- Нижний блок Уведомлений ---
var confirm_block_dn = {

    init: function () 
    {     
        $('#confirm_block_dn').click( function () 
        {
            confirm_block_dn.hide_block(); 
        }); 
    },
  
    show_block: function () 
    {     
        $('#confirm_block_dn').show('blind'); 
    }, 
 
    hide_block: function () 
    {     
        $('#confirm_block_dn').hide('blind'); 
    },

    set_text: function (text) 
    {      
        $('#confirm_block_dn').html(text); 
    },  

    show_confirm: function (text) 
    {  
        confirm_block_dn.set_text(text);
        confirm_block_dn.show_block(); 
    } 
   
   
}   


 
// -- Время свиданий ---
var dating_time = {
     
    init: function () 
    {                            
        dating_time.show();
        dating_time.load();
    } ,
    
    show: function () 
    {                        
        if (online < 777) 
        {           
            $('#button_videochat').show();
        } 
        else 
        if (online < 500000 && dating != '00:00') 
        {    
            $('#user_dating_time').text(dating);
            $('#user_dating_time_block').show();
        }  
    } ,  
    
    load: function () 
    {    
        if( uid ) 
        {    
            $('#dating_time_post_button').on('click',dating_time.ajax.save);
         
            var dating_hour = cookie_storage.get_cookie('dating_hour');    
            if (dating_hour)     
                $("#dating_hour :contains('"+dating_hour+"')").attr("selected", "selected");
                
            var dating_minut = cookie_storage.get_cookie('dating_minut') ;  
            if (dating_minut)
                $("#dating_minut :contains('"+dating_minut+"')").attr("selected", "selected"); 
        }  
        else
            $('#set_dating_time input').prop("disabled",true);  
    
    } , 
    
    ajax: { 
    
        save: function () 
        {      
            var time_str = $('#dating_hour').val().trim() + ':' +  $('#dating_minut').val().trim() ; 
            $.get('/ajax/post_abuse.php',{dating_time: time_str, hash: hash},dating_time.ajax.success); 
        } ,    
    
        success: function (data) 
        {   
            cookie_storage.set_cookie('dating_hour', $('#dating_hour').val(), 259200);
            cookie_storage.set_cookie('dating_minut',$('#dating_minut').val(),259200); 
            $('#saved_dating').show('fade');
            $('#saved_dating').delay(2000).hide('fade'); 
        } 
    }  
}      



// -- Изменение информации о контакте ---
var edit_cont = {
      
    init: function ()
    {
        $('#edit_cont_btn').click( function (){ edit_cont.show(); });
        $('#edit_human_btn').click( function (){ edit_cont.save(); });

    } ,

    show: function ()
    {
        var print_name = human_name ? human_name : auto_gen.name(human_sex);

        if ($('#human_print_name').text().search(/(Парень|Девушка)/) < 0)
            print_name = $('#human_print_name').text();

        $('#edit_human_name').val(print_name);

        if (!$('human_data_block').is('#edit_cont_elem'))
            $('#human_data_block').append($('#edit_cont_elem'));

        $('#edit_cont_elem').toggle('blind');
        $('#human_data_print').toggle('blind');      //alert (123);
    } ,

    save: function ()
    {
        human_name = $('#edit_human_name').val();

        edit_cont.update();
        edit_cont.show();
        edit_cont.send();

    } ,

    send: function ()
    {
        $.post( '/contact/extra/', { tid: tid, age: '', name: human_name, city: '' } );
        //cont_list.option.updater.show();
    } ,

    update: function ()
    {
        $('#human_print_name').text(human_name);
    }

}



var FormMess = new Vue({
    el: '#message_post_form',
    store,
    data: {
    	message: '',
        reply:  '',
        code:  '',
        show: true,
        process: false,
        approve: true,
        dirt: false,
        tid: null,
    },
    mounted: function () {
        this.tid = tid;

        $('#mess-text-area').on('keypress', (event, el) => {
            if((event.ctrlKey) && ((event.keyCode == 10) || (event.keyCode == 13))) {
                this.sendMessage();
            }
        });

    },
    watch: {
        message: function() { this.isDirt(); },
    },
    computed: Vuex.mapState({
        config: state => state.formMess,
        photo:  state => state.formMess.sendPhoto,
        intimate: state => state.formMess.intimate,
        user: state => state.user,
    }),
    methods: {
    	reset() {
            this.cancelPhoto();
    		this.show = true;
    		this.process = false;
            this.approve = true;
            this.message = '';
    	},
        isDirt: _.debounce(function() {
            let word = /\w{0,5}[хx]([хx\s\!@#\$%\^&*+-\|\/]{0,6})[уy]([уy\s\!@#\$%\^&*+-\|\/]{0,6})[ёiлeеюийя]\w{0,7}|\w{0,6}[пp]([пp\s\!@#\$%\^&*+-\|\/]{0,6})[iие]([iие\s\!@#\$%\^&*+-\|\/]{0,6})[3зс]([3зс\s\!@#\$%\^&*+-\|\/]{0,6})[дd]\w{0,10}|[сcs][уy]([уy\!@#\$%\^&*+-\|\/]{0,6})[4чkк]\w{1,3}|\w{0,4}[bб]([bб\s\!@#\$%\^&*+-\|\/]{0,6})[lл]([lл\s\!@#\$%\^&*+-\|\/]{0,6})[yя]\w{0,10}|\w{0,8}[её][bб][лске@eыиаa][наи@йвл]\w{0,8}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[uу]([uу\s\!@#\$%\^&*+-\|\/]{0,6})[н4ч]\w{0,4}|\w{0,4}[еeё]([еeё\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[нn]([нn\s\!@#\$%\^&*+-\|\/]{0,6})[уy]\w{0,4}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[оoаa@]([оoаa@\s\!@#\$%\^&*+-\|\/]{0,6})[тnнt]\w{0,4}|\w{0,10}[ё]([ё\!@#\$%\^&*+-\|\/]{0,6})[б]\w{0,6}|\w{0,4}[pп]([pп\s\!@#\$%\^&*+-\|\/]{0,6})[иeеi]([иeеi\s\!@#\$%\^&*+-\|\/]{0,6})[дd]([дd\s\!@#\$%\^&*+-\|\/]{0,6})[oоаa@еeиi]([oоаa@еeиi\s\!@#\$%\^&*+-\|\/]{0,6})[рr]\w{0,12}/i;
            this.dirt = word.test(this.message) ? true : false;
            return this.dirt;
        }, 700),
        upload() {
            store.commit('optionDialog', 'upload');
        },
        cancelPhoto() {
        	store.commit('sendPhoto', {photo: null, alias: null});
        },
        send() {
            this.photo.alias ? sendPhoto() : sendMessage();
        },
        sendPhoto() {
        	// TODO: почти готово, ждем сообщений
            //Vue.htt*p.headers.common['Authorization'] = 'Bearer ' + get_cookie('jwt');
            // let data = {
            // 	alias: this.photo.alias
            // };
            // this.$http.post('http://'+api_photo+'/api/v1/users/'+tid+'/sends', data).then(function (response) {
            //     //console.log(response.body);
            // });
            // window.location.reload();
        },
        sendMessage() {
            // TODO: убрать из формы старое говно
            let data = {
                id: this.tid,
                captcha_code: this.code
            };
            if (this.photo.alias) {
                data['photo'] = this.photo.alias;
            } else {
                data['mess'] = this.message;
                data['re'] = this.reply;
            }
            api.messages.send(data).then((response) => {
                this.onMessageSend(response.data);
            });
            this.process = true;
        },
        sendSex(sex) {
            this.$store.dispatch('SAVE_SEX', sex).then((response) => {
                this.sendMessage();
            }).catch((error) => {
                this.onError(error);
            });
            this.process = true;
        },
        onMessageSend(response) {
        	if (!response.saved && response.error) {
        		if (response.error == 'need_captcha') {
                    this.captcha();
        		}
                this.onError();
        	} else {
                this.sended(response);
        	}
            this.process = false;
        },
        sended(response) {
            //MessList.messages.unshift(response.message);
            MessList.reload();
            // TODO: старая зависимость
            $('#mess_shab_text_block').hide();
            giper_chat.timer_cut();
            this.reset();
        },
        captcha() {
            $('.form-message__captcha-img').get(0).src = '/secret_pic.php?hash='+hash;
            this.approve = false;
        },
        onError() {
            this.process = false;
        }
    },
});


// -- Форма отправки сообщения ---
var form_mess = {

    show_form: function () {
        $('#message_post_form').show('blind');
    },

    hide_form: function () {
        $('#message_post_form').hide('blind');
    }

}




var incoming_photo = new Vue({
    el: '#incoming-photo',
    store,
    data: {
        photos: [],
        user:   0,
        server: null,
    },
    created: function () {
        this.server = this.$store.state.photoServer;
    },
    methods: {
        loadPhoto() {
            let config = {
                headers: {'Authorization': 'Bearer ' + this.$store.state.apiToken},
                params: {tid, hash}
            };
            axios.get(`http://${this.server}/api/v1/users/${uid}/sends`,config).then((response) => {
                this.photos = response.data.photos;
                //console.log(this.photos);
            }).catch((error) => {
                console.log(error);
            });
        },
        show: function (index) {
            let photo = this.photos[index];
            let links = photo._links;
            if (links.origin.href) {
                let data = {
                    thumb: links.thumb.href,
                    photo: links.origin.href,
                    alias:  photo.alias,
                    height: photo.height,
                    width:  photo.width,
                }
                store.commit('viewPhoto', data);
                store.commit('optionDialog', 'photo');
            }
            //console.log(this.photos[index].height);
        },
    }
});

$(document).ready(function() {
    incoming_photo.loadPhoto();
});

// -- Я модератор, кнопка, блок ---
var moderator = {

    init: function ()
    {
       $('#moder_button').click( function (){ moderator.ajax_auth();  $('#moder_block').show('fade'); });
       $('#moder_block_close').click( function (){ moderator.close_block();  });

    },

    ajax_auth: function ()
    {
        disabled_with_timeout( $('.bun_btn_all'), 5);
        $.post('/moder/auth/',moderator.auth_resp);
    },

    ajax_promt: function ()
    {
        disabled_with_timeout( $('.bun_btn_all'), 5);
        $.post('/moder/promt/',moderator.auth_resp);
    },

    ajax_press: function (id, secure, expire, mark)
    {
        disabled_with_timeout( $('.bun_btn_all'), 5);
        $.post('/moder/press/', { id: id, secure: secure, expire: expire, mark: mark }, moderator.auth_resp);
    },

    auth_resp: function (data)
    {
        if (data)
        {
            $('#moder_block_inner').empty();
            $('#moder_block_inner').html(data);
            moderator.new_sett();
            disabled_with_timeout( $('.bun_btn_all'), 0.1);
        }

    },

    close_block: function ()
    {
        $('#moder_block').hide('fade');

    },

    new_sett: function (data)
    {
        $('#moder_agree').click( function (){ moderator.ajax_promt(); });
        $('#moder_close').click( function (){ moderator.close_block(); });

        var id = $('#bun_mess_id').val();
        var secure = $('#bun_mess_secure').val();
        var expire = $('#bun_mess_expire').val();
        $('#bun_ys').click( function (){
          moderator.ajax_press(id, secure, expire, 1);
        });
        $('#bun_no').click( function (){
          moderator.ajax_press(id, secure, expire, -1);
        });
        $('#bun_ig').click( function (){
          moderator.ajax_press(id, secure, expire, 0);
        });
        $('#bun_next').click( function (){
          moderator.ajax_press(0, secure, expire, 0);
        });







    }




}
    

          
// -- Предупреждение ф форме отправки сообщения ---        
var notice_post = {
      
    show: function () 
    {       
        //if ($.urlParam('notice_alert')) notice_post.alert(); 
        if ($('#notice_post').text().trim().length > 5) 
            $('#notice_post').show('clip'); 
    }, 
    
    alert: function () 
    {       
        $('#notice_post').toggleClass("notice_post notice_alert"); 
    } 
      
} 



// -- Большие подсказки в анкете ---     
var part_info = {    
        
    init: function () 
    {   
        if ($('#part_tip_block').data('name')) 
            part_info.reset();                                 
    } , 
    
    reset: function () 
    {                              
        $('#part_tip_close').click( function (){ part_info.close(); return false; }); 
        $('#part_tip_block form').submit( function (){ part_info.close(); return false; });  
    } , 
    
    close: function () 
    {                                            
        var post_form = $('#form_post_mess');                  
        $('#part_tip_block').hide('blind'); 
        
        var name = $('#part_tip_block').data('name');  
        $.post( '/user/closetip/', { tip: name }); 
    } 
}


   
 /* -- Установка динамической отправки формы ---  
 if( uid && user_sex ) $('#form_post_mess').bind('submit', function(){
  return post_mess();
 });  
    
 function post_mess( user,text ) { 
   if( !text ) text = $('#mess_text_val').val();
   if( !user ) user = tid;
    simple_hash();
                     
    
   $.post("/mailer/post/", {mess: text, id: user, hash: hash},  
    onAjaxSuccess );           
   
   function onAjaxSuccess(data) {       //  alert (data)     
    if( !data ) return 0;  
     var mess = JSON.parse( data );  
     if( mess.error == 'captcha' ) { 
      $('#form_post_mess').unbind('submit');
      $('#form_post_mess').submit(); }
     if( mess.saved == '1' ) {  
      load_mess( user,'reload' );
      $('#mess_text_val').val('');
       } 
     if( mess.error == 'reload' ) {     
      ft = 0; //alert ('reload')  
      $('#form_post_mess').unbind('submit');
      $('#form_post_mess').submit();            
     }                      
   }            
    return false;
 }             */ 



// -- Быстрые фотографии ---
var quick_photo = {

    init: function ()
    {
        quick_photo.ajax.load();
    } ,

    ajax: {

        load: function ()
        {
            // TODO: запустить быстрые фото. ВЫКЛЮЧЕНО !!!
            //$.get( '/ajax/load_pic.php',quick_photo.ajax.success);
        } ,

        success: function (data)
        {
            if (data.indexOf('div') > 0)
            {
                $('#micro_images_hint').html( data ) ;
                $( '.img_list_micro' ).click( function () {
                 location.href = '/mail.php?photo='+$(this).attr('alt')+'&id='+tid;
                });
                $('#send_photo_link').mouseover( function () {
                 $('#micro_images_block').show('fade');
                });

                $(document).mouseup(function (e)
                {
                    var container = $('#micro_images_block');
                    if (!container.is(e.target) // if the target of the click isn't the container...
                        && container.has(e.target).length === 0) // ... nor a descendant of the container
                    {
                        container.hide('fade');
                    }
                });
            }
        }

    }
}
