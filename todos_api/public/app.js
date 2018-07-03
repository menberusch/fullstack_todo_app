var api = '/api/todos/',
    ul = $('.list');

$.getJSON(api).then(data => data.forEach(todo => createTodo(todo)));

$('form').submit((e) => {
  e.preventDefault();
  var input = $('input');
  $.post(api, { name: input.val()})
  .then(newTodo => createTodo(newTodo))
  .catch(err => console.log(err));
  input.val('');
});

$('.list').on('click', 'span', function() {
  var li = $(this).parent();
  $.ajax({
    url: api + li.data('id'),
    method: 'DELETE',
    success: () => li.remove()
  });
});

$('.list').on('click', '.task', function() {
  var li = $(this),
      newData = !li.data('completed');
  $.ajax({
    url: api + li.data('id'),
    method: 'PUT',
    data: {completed: newData},
    success: () => li.toggleClass('done').data('completed', newData)
  });
});

function createTodo(todo) {
  var li = $(document.createElement('li'));
  li.data('id', todo._id)
    .data('completed', todo.completed)
    .addClass('task').text(todo.name)
    .append('<span>X</span>');
  if(todo.completed) {
    li.addClass('done');
  }
  ul.append(li);
}
