function onLoadScript(){
    let canvHeight;
    let canvWidth;
    var imageLoader = document.getElementById('img');
        imageLoader.addEventListener('change', handleImage, false);
    var c = document.getElementById('canv');
    c.addEventListener('mousedown', handleCanvasClick, false);
    var btn = document.getElementById('btn_sub');
    btn.addEventListener('click', handleClick, false);
    var ctx = c.getContext('2d');
    var imgContainer = document.getElementById("img-container");
    var imgContainer1 = document.getElementById("img-container1");
    
    function handleImage(e){
        var reader = new FileReader();
        reader.onload = function(event){
            var img = new Image();
            img.onload = function(){
                c.width = img.width;
                c.height = img.height;
                canvHeight = img.height;
                canvWidth = img.width;
                ctx.drawImage(img,0,0);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);     
    }

    function handleCanvasClick(e){
        console.log(e.offsetY);//761
        console.log(e.offsetX);//1363
        var p = c.getContext("2d").getImageData(e.offsetY, e.offsetX, 1, 1).data;
        var hex = "RGB = " + p[0]+", "+p[1]+", "+p[2];
        console.log(hex)
    }

    function handleClick(e){
        console.log(canvWidth)
        console.log(canvHeight)
        var vals = [];
        var samples = [];
        for(let i=1;i<=canvHeight;i+=5){
            for(let j=1;j<=canvWidth;j+=5){
                var p = c.getContext("2d").getImageData(j, i, 1, 1).data;
                var hex = i+", "+j+"-- RGB = " + p[0]+", "+p[1]+", "+p[2];
                vals.push(hex)
                samples.push(`${j-1}px ${i-1}px 4px 5px rgb(${p[0]}, ${p[1]}, ${p[2]})`);
            }
        }
        var shadow = samples.join(", ");
        
        console.log(vals);
        console.log(samples);
        console.log(shadow);
        
        // imgContainer.style.width = `1px`;
        // imgContainer.style.height = `1px`;
        imgContainer.style['boxShadow'] = shadow;
    }
}