const gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach(item => {
    item.addEventListener('mouseenter', highlightColumn)
})

function highlightColumn(event) {
    const item = event.target;
    const column = item.dataset.column;
    const itemsInColumn = document.querySelectorAll(`div[data-column="${column}"]`);
    itemsInColumn.forEach(itemsInColumn => itemsInColumn.getElementsByClassName.backgroundColor = 'rgba(0,0,0,0.5)')
}

// Mouse leave event listener
gridItems.forEach(item => {
    item.addEventListener('mouseleave', unlightColumn)
})

function unlightColumn(event) {
    const item = event.target;
    const column = item.dataset.column
    const itemsInColumn = document.querySelectorAll(`div[data-column="${column}"]`);
    itemsInColumn.forEach(itemsInColumn => itemsInColumn.getElementsByClassName.backgroundColor = 'rgba(0,0,0,0)')
}