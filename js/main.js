$(function () {
  //Navbar Active Links:

  $(".navbar .nav-link").on("click", function (e) {
    e.preventDefault();

    $(this).parent().addClass("active").siblings().removeClass("active");

    //Smooth scrolling on click to nav:

    $("html,body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      3000
    );
  });

  //NavbarActive Links changing On Scroll:

  $(window).on("scroll", function () {
    let currPoition = $(this).scrollTop();

    $(".navbar .nav-link").each(function () {
      let sectionOffset = $($(this).attr("href")).offset().top;

      if (currPoition > sectionOffset) {
        $(this).parent().addClass("active").siblings().removeClass("active");
      }
    });
  });

  //Header Height:

  let header = $("header");

  $("header").height($(window).height());

  header.on("resize", function () {
    header.height($(this).height());
  });

  //Change navbar On Scroll:
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar")
        .removeClass("bg-transparent , navbar-white")
        .addClass("bg-white")
        .css("padding", ".6rem");
    } else {
      $(".navbar")
        .addClass("bg-transparent , navbar-white")
        .removeClass("bg-white")
        .css("padding", "1rem");
    }
  });

  // Animated Typing p text:
  let texts = [
      "CEO DevFolio",
      "Web Developer",
      "Web Designer",
      "Frontend Developer",
      "Graphic Designer",
    ],
    textIndex = 0,
    letterIndex = 0,
    text = "",
    letter = "";

  (function type() {
    if (textIndex === texts.length) {
      textIndex = 0;
    }
    text = texts[textIndex];

    letter = text.slice(0, ++letterIndex);

    $("header p").text(letter);

    if (letter.length === text.length) {
      textIndex++;
      letterIndex = 0;
    }

    setTimeout(type, 100);
  })();

  //Statistics Counter

  let scrollCount = 1;
  let counterTop = $(".statistics").offset().top;

  $(window).on("scroll", function () {
    if ($(this).scrollTop() >= counterTop - 500) {
      timerId = setTimeout(function () {
        var maxCounts = [],
          maxDivides = [],
          counts = [];

        $(".statistic h4").each(function (index, el) {
          maxCount = $(this).attr("data-count-val");
          maxCount = parseInt(maxCount);
          maxCounts.push(maxCount);

          maxDivide = $(this).attr("data-count-addition");
          maxDivide = parseInt(maxDivide);
          maxDivides.push(maxDivide);

          count = $(this).attr("data-count-start");
          count = parseInt(count);
          counts.push(count);

          function countUp() {
            counts[index] += maxDivides[index];

            $(".statistic h4").eq(index).text(counts[index].toLocaleString());

            if (counts[index] > maxCounts[index]) {
              $(".statistic h4")
                .eq(index)
                .text(maxCounts[index].toLocaleString());
            }
          }
          setInterval(function () {
            if (counts[index] < maxCounts[index]) {
              countUp();
            }
          }, 50);
        });
        scrollCount = 2;
      });
      if (scrollCount == 2) {
        clearTimeout(timerId);
      }
    }
  });

  //Portifolio PopUp Window:
  let myImages = Array.from($(".portfolio .card img")),
    popup = $(".portfolio .popup"),
    close = $(".portfolio .popup i.fa-times"),
    left = $(".portfolio .popup i.fa-angle-left"),
    right = $(".portfolio .popup i.fa-angle-right"),
    currentImageIndex = 0;

  //open popup window:
  $(".portfolio .card").each(function () {

    $(this).on("click", function (e) {
      let imgeSrc = e.target.src;
      currentImageIndex = myImages.indexOf(e.target);
      popup.css("display", "flex").find(".popup-img").css("backgroundImage", "url(" + imgeSrc + ")");

    //close popup window:
    popup.on('click',function(){popup.fadeOut().find('.popup-img').on('click',function(e){e.stopPropagation()})})
    close.on('click',function(){
      popup.hide();
    });
    //Go Next:
    right.on('click',function(e){
      e.stopPropagation();
      currentImageIndex++;
      if(currentImageIndex == myImages.length){currentImageIndex = 0};
      popup.find(".popup-img").css("backgroundImage", "url(" + myImages[currentImageIndex].src + ")");
    });
    //Go Prev:
    left.on('click',function(e){
      e.stopPropagation();
      currentImageIndex--;
      if(currentImageIndex < 0){currentImageIndex = myImages.length -1};
      popup.find(".popup-img").css("backgroundImage", "url(" + myImages[currentImageIndex].src + ")");
    });
 
  });

  });

  //Scroll Top Button:
  let scrollTopBtn = $(".scrollTop");

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 700) {
      scrollTopBtn.fadeIn();
    } else {
      scrollTopBtn.fadeOut();
    }
  });
  scrollTopBtn.on("click", function () {
    $("html,body").animate({ scrollTop: "0" }, 1000);
  });

  //Loading Screen:
  $(window).on("load", function () {
    $(".loading").fadeOut(2000);
  });
});
