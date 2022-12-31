
const colorPicker = document.querySelector("#color-picker");

const colorList = document.querySelector(".all-colors");

const clearAll = document.querySelector(".clear-all");

const pickedColors = JSON.parse(localStorage.getItem("color-data") || "[]");

const copyColor = elem => {

    navigator.clipboard.writeText(elem.dataset.color);

    //elem.innerText = "Copied";

    //setTimeout(() => elem.innerText = elem.dataset.color, 1000);
}

const showColors = () => {

    colorList.innerHTML = pickedColors.map(color => `

       <li class="color">
       
          <span class="rect" style="background: ${color};
          
          border: 1px solid ${color == "#FFFFFF" ? "#ccc" : color}"></span>
                
          <span class="value" data-clor="${color}">${color}</span>
            
       </li>
    `).join("");

    // add a click event listener to each color element to copy the color code

    document.querySelectorAll(".color").forEach(li => {

        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });


}

showColors();

const  activateEyeDropper = async () => {
    try{
        const eyeDropper = new EyeDropper();

        const { sRGBHex }= await eyeDropper.open();

        await navigator.clipboard.writeText(sRGBHex);

        if(!pickedColors.includes(sRGBHex))
        {
            pickedColors.push(sRGBHex);

            localStorage.setItem("color-data", JSON.stringify(pickedColors));

            showColors();
        }

    }catch(error)
    {
        console.log(error)
    }
}

const clearAllColors = () => {

    pickedColors.length = 0;

    localStorage.setItem("color-data", JSON.stringify(pickedColors));

}

clearAll.addEventListener("click", clearAllColors);

colorPicker.addEventListener("click", activateEyeDropper);