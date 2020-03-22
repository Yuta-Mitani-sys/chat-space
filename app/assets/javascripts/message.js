$(function(){
  
  function buildHTML (message){
    if (message.image) {
      var html = `<div class="message-box" data-message-id="${message.id}">
                    <div class="message-box__upper-info">
                      <div class="message-box__upper-info__name">
                        ${message.user_name}
                      </div>
                      <p class="message-box__upper-info__name__data">
                        ${message.created_at}
                      </p>
                    </div>
                    <div class="message-box__message">
                      <div class="message-box__message__text">
                        ${message.content}
                      </div>
                      <img src=${message.image} >
                    </div>
                  </div>`
      return html;
    } else {
      var html = `<div class="message-box" data-message-id="${message.id}">
                    <div class="message-box__upper-info">
                      <div class="message-box__upper-info__name">
                      ${message.user_name}
                      </div>
                      <p class="message-box__upper-info__name__data">
                        ${message.created_at}
                      </p>
                    </div>
                    <div class="message-box__message">
                      <div class="message-box__message__text">
                        ${message.content}
                      </div>
                    </div>
                  </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log(this);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.message-list').append(html).animate({ scrollTop: $('.message-list')[0].scrollHeight});
       $('form')[0].reset();
       $('.new-message__submit-btn').removeAttr('disabled'); 
     })
     .fail(function() {
      alert("メッセージ送信に失敗しました");
     });
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message-box:last').data("message-id");
      console.log(last_message_id);
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log(messages)
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message-list').append(insertHTML);
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      })
      .fail(function() {
        alert('error');
      });
    }
  };
  setInterval(reloadMessages, 7000);
});