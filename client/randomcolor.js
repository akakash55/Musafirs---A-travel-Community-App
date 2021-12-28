[function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  
  
  function setRandomColor() {
    $("#colorpad").css("background-color", getRandomColor());
  }

  function r() { return Math.floor(Math.random() * 256) }]

[var color = 'rgb(' + r() + "," + r() + "," + r() + ')';

You just need to end up with a string such as 'rgb(255, 123, 220)']


[const setBg = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
    color.innerHTML = "#" + randomColor;
  }
  
  genNew.addEventListener("click", setBg);
  setBg();]

  [function generateRandomColor()
    {
        var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        return randomColor;
        //random color will be freshly served
    }]