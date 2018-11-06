var httpRequest = new XMLHttpRequest();
var listItems = [];
var listItemNr = 0;
var hover = false;
var index = -1;

function onKeyUp(e) {
    e.preventDefault();
    var target = document.getElementById('search-result-container');
    switch(e.key) {
        case 'ArrowUp':
            if( index !== 0) {
                target.children[index].id = '';
                index -= 1;
                target.children[index].id = 'active';
            }
            break;
        case 'ArrowDown':
            if(target.children.length > index + 1) {
                if(index !== -1) {
                target.children[index].id = '';
                }
                index += 1;
                target.children[index].id = 'active';
            }
            break;
        case 'Enter':
            if(index !== -1) {
                target.children[index].id = '';
                addListItem(index);
            }
            break;
        default:
            var value = e.target.value;
            httpRequest.onreadystatechange = function(){
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                        listItems = JSON.parse(httpRequest.response);
                        if(listItems.Search) {
                            searchResultList();
                        } else {
                            document.getElementById('search-result-container').innerHTML = '';
                            document.getElementById('search-result-container').style.padding = '0';
                        }
                    } else {
                        alert('There was a problem with the request.');
                    }
                }
            };
            httpRequest.open('GET', 'http://www.omdbapi.com/?apikey=ed604f05&s=' + value);
            httpRequest.send();
    }
}
function displaySearchResultList(focus) {
    var target = document.getElementById('search-result-container');
    if(focus) {
        target.style.display = 'block';
    } else if(!hover) {
        target.style.display = 'none';
    }
}
function searchResultList() {
    var target = document.getElementById('search-result-container');
    target.innerHTML = '';
    listItems.Search.forEach(function (listItem, idx) {
        target.innerHTML +=
        '<li class="search-result-list-item" onmouseover="toggleHover(true)" onmouseleave="toggleHover()" onclick="addListItem('+idx+')">' +
            '<p class="search-result-list-item-text">'+listItem.Title+'</p>' +
        '</li>'
    });
}
function toggleHover(over) {
    hover = over;
}
function addListItem(idx) {
    var target = document.getElementById('search-history-container');
    var id = "list-item-" + listItemNr;

    if(target.children.length === 0) {
        target.style.padding = '20rem 0';
    }

    document.querySelector('input').blur();
    document.querySelector('input').value = '';

    target.innerHTML +=
        '<li id="'+id+'" class="list-item">'+
            '<div class="list-item-text-container">' +
                '<p class="title">' + listItems.Search[idx].Title + '</p>' +
                '<p>' + getDate() +'</p>' +
            '</div>' +
            '<div class="list-item-button-container" onclick="removeListItem('+listItemNr+')">' +
                '<button>X</button>' +
            '</div>' +
        '</li>';

    document.getElementById('search-result-container').style.display = 'none';
    document.getElementById('search-result-container').innerHTML = '';
    listItemNr += 1;
    listItems = [];
    index = -1;
}
function getDate() {
    var today = new Date();
    var month = today.getMonth() < 10 ? '0'+today.getMonth()+1 : today.getMonth()+1;
    var day = today.getDate() < 10 ? '0'+today.getDate() : today.getDate();
    var hours = today.getHours() < 10 ? '0'+today.getHours() : today.getHours();
    var minutes = today.getMinutes() < 10 ? '0'+today.getMinutes() : today.getMinutes();
    return today.getFullYear()+'-'+month+'-'+day+' '+hours+':'+minutes;
}
function removeListItem(listItemNr) {
    var target = document.getElementById('search-history-container');
    if(target.children.length === 1){
        target.style.padding = '0';
    }
    document.getElementById("list-item-" + listItemNr).remove()
}
