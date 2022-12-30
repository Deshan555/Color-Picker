
const colorPicker = document.querySelector("#color-picker");

const colorList = document.querySelector(".all-colors");

const pickedColors = JSON.parse(localStorage.getItem("color-data") || "[]");

const showColors = () => {

    colorList.innerHTML = pickedColors.map(color => `

       <li class="color">
       
          <span class="rect" style="background: ${color};
          
          border: 1px solid ${color == "#FFFFFF" ? "#ccc" : color}"></span>
                
          <span class="value">${color}</span>
            
       </li>
    `).join("")


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

colorPicker.addEventListener("click", activateEyeDropper);