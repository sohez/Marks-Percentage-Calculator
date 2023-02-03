console.log("Create BY SOHEL SAYYED");
add();
function add() {
    let bd = document.getElementById("bd");
    let close = document.getElementsByClassName("close");
    let data = `<tr>
        <td ><input type="text" class="subject" aria-label="Subject" placeholder="Subject"/></td>
        <td class="ml"><input type="number" class="Scored" aria-label="Scored Marks" placeholder="Scored Marks"/></td>
        <td class="ml"><input type="number" class="total" aria-label="total Marks" placeholder="Total Marks"/></td>
        <td><button class="close">Delete</button></td>
      </tr>`;
    bd.insertAdjacentHTML("beforeend", data);
    for (let i = 0; i < close.length; i++) {
        close[0].style.display = "none";
        close[i].onclick = function () {
            var div = this.parentElement;
            div = div.parentElement;
            div.remove(); //remove the selected element from DOM
        };
    }
}

function sum() {
    let Scored = document.getElementsByClassName("Scored");
    let Total = document.getElementsByClassName("total");
    let total_marks = 0;
    let scored_marks = 0;

    for (let i = 0; i < Scored.length; i++) {
        scored_marks = parseFloat(scored_marks) + parseFloat(Scored[i].value);
    }
    document.getElementById("sco").innerHTML =
        "Scored Marks: <br>" + parseFloat(scored_marks).toFixed(2);

    for (let i = 0; i < Total.length; i++) {
        total_marks = parseFloat(total_marks) + parseFloat(Total[i].value);
    }
    document.getElementById("tot").innerHTML =
        "Total Marks: <br>" + parseFloat(total_marks).toFixed(2);

    document.getElementById("per").innerHTML =
        "Percentage: <br>" +
        parseFloat((scored_marks / total_marks) * 100).toFixed(2) +
        "%";

    document.getElementById("box").style.display = "block";
    document.getElementById("print").style.display = "block";
    create_table(
        parseFloat(total_marks).toFixed(2),
        parseFloat(scored_marks).toFixed(2),
        parseFloat((scored_marks / total_marks) * 100).toFixed(2)
    );
}

function create_table(tm, sc, permark) {
    let table_body = document.getElementById("rows-data");
    let Scored = document.getElementsByClassName("Scored");
    let Total = document.getElementsByClassName("total");
    let subject = document.getElementsByClassName("subject");

    let row_data = "";

    for (let i = 0; i < Scored.length; i++) {
        row_data += `<tr>
          <td>${subject[i].value}</td>
          <td>${Scored[i].value}</td>
          <td>${Total[i].value}</td>
              </tr>`;
    }
    table_body.innerHTML = row_data;
    document.getElementById("per-dis").innerHTML =
        "Percentage: <br>" + permark + "%";
    document.getElementById("sco-dis").innerHTML = "Scored Marks: <br>" + sc;
    document.getElementById("tot-dis").innerHTML = "Total Marks: <br>" + tm;
    document.getElementById("name-dis").innerHTML = document.getElementsByClassName("name")[0].value;
}

function print_marks() {
    var element = document.getElementById("box");
    var opt = {
        margin: 1,
        filename: "result.pdf",
        image: { type: "jpeg", quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
}
