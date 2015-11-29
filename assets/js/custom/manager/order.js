$(document).ready(function() {
  // Будуємо список заявок
  getOrders();

  // Отримуємо список користувачів
  $.ajax({
      method: 'GET',
      url: "/api/user/",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
    .done(function(response) {
      response.forEach(function(item) {
        $('#inputUser').append('<option value="' + item.id_user + '">' + item.last_name + ' ' + item.first_name + ' ' + item.middle_name + '</option>');
      });
    });

  // Отримуємо список типів послуг
  $.ajax({
      method: 'GET',
      url: "/api/type/",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
    .done(function(response) {
      response.forEach(function(item) {
        $('#inputType').append('<option value="' + item.id_type + '">' + item.title + '</option>');
      });
    });


  $('#myModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var recipient = button.data('item');
    var modal = $(this);
    if (recipient == -1) {
      modal.find('.modal-title').text('Додати заявку');
      modal.data('id', -1);
      $("#dataForm").trigger("reset");
    } else {
      modal.find('.modal-title').text('Редагувати заявку ' + recipient)
      modal.data('id', recipient);
      $.ajax({
          method: 'GET',
          url: "/api/order/" + recipient,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
        })
        .done(function(response) {
          modal.find('#inputUser').val(response.user.id_user);
          modal.find('#inputType').val(response.type.id_type);
          modal.find('#inputContent').val(response.content);
          modal.find('#inputCreateTime').text(response.create_time);
          modal.find('#inputCompleteTime').text(response.complete_time);
          modal.find('#inputMessages').empty();
          response.messages.forEach(function(item){
            html = '<div class="row"><div class="col-md-4">';
            html += $('#inputUser option[value="' + item.user + '"]').text();
            // html += item.user || '';
            html += '<br /><small>';
            html += item.create_time || '';
            html += '</small></div><div class="col-md-8">';
            html += item.content || '';
            html += '</div></div>';
            modal.find('#inputMessages').append(html);
          });
        })
    }
  })
});

function saveOrder() {
  id = $('#myModal').data('id');
  if (id == -1) {
    createOrder();
  } else {
    updateOrder(id);
  }
}

function getOrders() {
  $.ajax({
      method: 'GET',
      url: "/api/order",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
    .done(function(response) {
      var tableBody = $("#dataTable").empty();
      var html = '';
      response.forEach(function(item, i, arr) {
        html = '<tr><td>';
        html += item.user.last_name || '';
        html += ' ';
        html += item.user.first_name || '';
        html += ' ';
        html += item.user.middle_name || '';
        html += '</td><td>';
        html += item.type.title;
        html += '</td><td>';
        html += item.content || '';
        html += '</td><td>';
        html += item.create_time || '';
        html += '</td><td>';
        html += item.complete_time || '';
        html += '</td><td>';
        html += '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" data-item="' + item.id_order + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button> ';
        html += '<button type="button" class="btn btn-danger btn-sm" onclick="deleteOrder(' + item.id_order + ')"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';
        html += '</td>';
        html += '</tr>';
        tableBody.append(html);
      });
    });
}

function createOrder() {
  data = {
    user: {id_user: $('#inputUser').val()},
    type: {id_type: $('#inputType').val()},
    content: $('#inputContent').val(),
  }
  $.ajax({
      method: 'POST',
      url: "/api/order",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data)
    })
    .done(function(response) {
      getOrders();
    });
}

function updateOrder(id) {
  data = {
    user: {id_user: $('#inputUser').val()},
    type: {id_type: $('#inputType').val()},
    content: $('#inputContent').val(),
    create_time: $('#inputCreateTime').val(),
    complete_time: $('#inputCompleteTime').val(),
  }
  $.ajax({
      method: 'PUT',
      url: "/api/order/" + id,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data)
    })
    .done(function(response) {
      getOrders();
    });
}

function deleteOrder(id) {
  $.ajax({
      method: 'DELETE',
      url: "/api/order/" + id,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
    .done(function(response) {
      getOrders();
    });
}

function sendMessage() {
  data = {
    order: {id_order: $('#myModal').data('id')},
    user: {id_user: $('#inputUser').val()},
    content: $('#inputMessageContent').val()
  }
  $.ajax({
      method: 'POST',
      url: "/api/message",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data)
    })
    .done(function(response) {
      html = '<div class="row"><div class="col-md-4">';
      html += response.user || '';
      html += '<br /><small>';
      html += response.create_time || '';
      html += '</small></div><div class="col-md-8">';
      html += response.content || '';
      html += '</div></div>';
      $('#inputMessages').append(html);
    });
}
