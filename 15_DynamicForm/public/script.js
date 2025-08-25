const addBtn = document.querySelector(".addBtn");
const container = document.querySelector(".extraEle");

let num = 1;

addBtn.addEventListener("click", () => {
    const newDiv = document.createElement("div");
    newDiv.className = "dynamicDiv";

    newDiv.innerHTML = `
        <label for="id${num}">extra ${num} : </label>
        <input type="text" id="id${num}" name="extra[]" />
        <button class="deleteBtn" type="button">delete</button>
    `;

    container.appendChild(newDiv);
    num++;

    const deleteBtn = newDiv.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
        container.removeChild(newDiv);
        updateNumbering();
    });
});

function updateNumbering() {
    const allDivs = container.querySelectorAll(".dynamicDiv");
    allDivs.forEach((div, index) => {
        const label = div.querySelector("label");
        const input = div.querySelector("input");

        const currentNum = index + 1;
        label.textContent = `extra ${currentNum} : `;
        label.setAttribute("for", `id${currentNum}`);
        input.id = `id${currentNum}`;
    });

    num = allDivs.length + 1;
}
