var httpRequest = new XMLHttpRequest();
var listItem = [];
var nr = 0;

function onClick(e) {
    e.preventDefault();
    var value = e.target[0].value;
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                listItem = JSON.parse(httpRequest.response);
                addListItem();
            } else {
                alert('There was a problem with the request.');
            }
        }
    };
    httpRequest.open('GET', 'http://www.omdbapi.com/?apikey=ed604f05&t=' + value);
    httpRequest.send();
}
function addListItem() {
    var target = document.getElementById('search-history-container');
    var id = "list-item-" + nr;

    if(target.children.length === 0) {
        target.style.padding = '20rem 0';
    }

    target.innerHTML +=
        '<li id="'+id+'" class="list-item">'+
            '<div class="list-item-text-container">' +
                '<p class="title">' + listItem.Title + '</p>' +
                '<p>' + getDate() +'</p>' +
            '</div>' +
            '<div class="list-item-button-container" onclick="removeListItem('+nr+')">' +
                '<button>X</button>' +
            '</div>' +
        '</li>';
    nr += 1;
}
function getDate() {
    var today = new Date();
    var month = today.getMonth() < 10 ? '0'+today.getMonth()+1 : today.getMonth()+1;
    var day = today.getDate() < 10 ? '0'+today.getDate() : today.getDate();
    var hours = today.getHours() < 10 ? '0'+today.getHours() : today.getHours();
    var minutes = today.getMinutes() < 10 ? '0'+today.getMinutes() : today.getMinutes();
    return today.getFullYear()+'-'+month+'-'+day+' '+hours+':'+minutes;
}
function removeListItem(nr) {
    var target = document.getElementById('search-history-container');
    if(target.children.length === 1){
        target.style.padding = '0';
    }
    document.getElementById("list-item-" + nr).remove()
}
