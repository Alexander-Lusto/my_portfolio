let start = 28;
let finish_month = 31;
let finish = 31;

function calendar_days(start, finish_month, finish){

  let list = document.querySelector('.calendar__dates-list');
  let template = document.getElementById('template').content;
  let date = template.querySelector('.calendar__date-item');

  for(let i= start; i <= finish_month; i++){
    let item = date.cloneNode(true);
    item.textContent = i;
    item.classList.add('calendar__date-item--previous');
    list.appendChild(item);
  }

  for(let i= 1; i <= finish; i++){
    let item = date.cloneNode(true);
    let item_text = item.querySelector('span');
    item_text.textContent = i;
    list.appendChild(item);
  }
}

calendar_days(start, finish_month, finish);
