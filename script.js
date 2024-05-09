let studentList = []
let id = 0;
let index = 1;

window.onload = function() {
    ShowInfo(index);
    Pagination();
};

var tableList = document.getElementById('table_list_student');

function RenderList() {
    var tablebody = tableList.querySelector('tbody');
    tablebody.innerHTML = '';
    id = 0;
    studentList.forEach(student => {
        var row = document.createElement('tr');
        var ID_cell = document.createElement('td');
        var Ten_cell = document.createElement('td');
        var NS_cell = document.createElement('td');
        var GT_cell = document.createElement('td');
        var CN_cell = document.createElement('td');
 
        ID_cell.textContent = student.id;
        Ten_cell.textContent = student.ten;
        NS_cell.textContent = student.ns;
        GT_cell.textContent = student.gt;
        CN_cell.textContent = student.cn;

        row.appendChild(ID_cell);
        row.appendChild(Ten_cell);
        row.appendChild(NS_cell);
        row.appendChild(GT_cell);
        row.appendChild(CN_cell);

        tablebody.appendChild(row);
    });
}

function Pagination() {
    const filePath = 'data.txt';
    var id = index;
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const numberOfLines = lines.length;

            var ulElement = document.getElementById('ul_number');
            const prevLi = document.createElement('li');
            prevLi.innerHTML = `<a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-emerald-400 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" id="Prev"><</a>`;
            ulElement.appendChild(prevLi);

            for(let i = 1; i <= Math.ceil(numberOfLines/10); i++) {
                const pageLi = document.createElement('li');
                pageLi.innerHTML = `<a href="#" id="${i}" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-emerald-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${i}</a>`;
                ulElement.appendChild(pageLi);
                if(i == 1) {
                    var clickedItem = document.getElementById(`${i}`);
                    clickedItem.style.backgroundColor = 'gray'; 
                    clickedItem.style.color = 'white';
                }

                pageLi.addEventListener('click', function() {
                    id = i;
                    ShowInfo(i);

                    if(id == Math.ceil(numberOfLines/10)) {
                        var next = document.getElementById("Next");
                        next.classList.add('disabled');
                    } else {
                        var next = document.getElementById("Next");
                        next.classList.remove('disabled');
                    }
                    if(id == 1) {
                        var prev = document.getElementById("Prev");
                        prev.classList.add('disabled');
                    } else {
                        var prev = document.getElementById("Prev");
                        prev.classList.remove('disabled');
                    }
                    var allLinks = document.querySelectorAll('ul#ul_number li a');
                    allLinks.forEach(function(link) {
                        link.style.backgroundColor = ''; 
                        link.style.color = ''; 
                    });
                    var clickedItem = document.getElementById(`${i}`);
                    clickedItem.style.backgroundColor = 'gray'; 
                    clickedItem.style.color = 'white';
                });
            }

            prevLi.addEventListener('click', function() {
                ShowInfo(--id);
                var next = document.getElementById("Next");
                next.classList.remove('disabled');

                var allLinks = document.querySelectorAll('ul#ul_number li a');
                allLinks.forEach(function(link) {
                    link.style.backgroundColor = ''; 
                    link.style.color = ''; 
                });
                var clickedItem = document.getElementById(`${id}`);
                clickedItem.style.backgroundColor = 'gray'; 
                clickedItem.style.color = 'white';
                if(id == 1) {
                    var prev = document.getElementById("Prev");
                    prev.classList.add('disabled');
                }
            });

            const nextLi = document.createElement('li');
            nextLi.innerHTML = `<a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-emerald-400 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" id="Next">></a>`;
            ulElement.appendChild(nextLi);

            nextLi.addEventListener('click', function() {
                ShowInfo(++id);
                var prev = document.getElementById("Prev");
                prev.classList.remove('disabled');

                var allLinks = document.querySelectorAll('ul#ul_number li a');
                allLinks.forEach(function(link) {
                    link.style.backgroundColor = ''; 
                    link.style.color = ''; 
                });
                var clickedItem = document.getElementById(`${id}`);
                clickedItem.style.backgroundColor = 'gray'; 
                clickedItem.style.color = 'white';
                if(id == Math.ceil(numberOfLines/10)) {
                    var next = document.getElementById("Next");
                    next.classList.add('disabled');
                }
            });

        })
        .catch(error => console.error('Error fetching data:', error));
}

RenderList();

function ShowInfo(index) {
    let first_line = (index * 10 - 10);
    console.log(first_line);
    let last_line = index * 10 - 1; 
    const filePath = 'data.txt';
    studentList.splice(0, studentList.length);
    console.log(studentList);
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            for (let i = first_line; i <= last_line && i < lines.length; i++) {
                const elements = lines[i].split(',');

                const ten = elements[0].trim();
                const ns = elements[1].trim();
                const gt = elements[2].trim();
                const cn = elements[3].trim();

                ++id;

                var newStudent = { id, ten, ns, gt, cn };
                studentList.push(newStudent);
            }
            RenderList();
        })
        .catch(error => console.error('Error fetching data:', error));
}