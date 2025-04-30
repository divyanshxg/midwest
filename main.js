

const images = Array.from(document.querySelectorAll(".img_container"))
//
images.forEach(image => {
  gsap.set(image.querySelector("img"), {
    yPercent: 100
  })
})
const grid = document.querySelector(".grid")
const span = document.querySelector("span")
// const text = new SplitType(span)

// gsap.set(text, {
//   autoAlpha: 0
// })
// gsap.set(span, {
//   opacity: 0
// })
const { left, width } = grid.getBoundingClientRect();
let activated = false
images.forEach(image => {

  image.addEventListener("mouseover", () => {
    if (!activated) {
      gsap.to(image.querySelector(".text"), {
        color: "#fff",
        duration: 0.5,
        ease: "ease"
      })
      gsap.to(image.querySelector("img"), {
        yPercent: 0,
        duration: 0.5,
        ease: "ease"
      })
    }
  })
  image.addEventListener("mouseleave", () => {
    if (!activated) {
      gsap.to(image.querySelector(".text"), {
        color: "#000",
        duration: 0.5,
        ease: "ease"
      })
      gsap.to(image.querySelector("img"), {
        yPercent: 100,
        duration: 0.5,
        ease: "ease"
      })
    }
  })
})
gsap.set(span, {
  opacity: 0
})

const bottomLeftText = document.querySelector("body >div > div.container > main > div > div.first > div > div").getBoundingClientRect()
console.log(bottomLeftText.left)

const cols = document.querySelectorAll(".grid > div")
function startFullScreen(curr_img, activated) {

  if (!activated) {
    cols.forEach(col => {
      if (col.children[0] != curr_img) {
        gsap.to(col, {
          border: "0",
          duration: 0.4,
          ease: "ease"
        })
      }
    })
    gsap.from(span, {
      y: 20,
      opacity: 0,
      duration: 0.9,
      delay: 0.6,
      ease: "none"
    })
    // gsap.from(text.words, {
    //   y: 40,
    //   opacity: 0,
    //   skewX: 10,
    //   stagger: 0.005,
    //   duration: 0.4,
    //   delay: 0.2,
    //   ease: "none"
    // })
    images.forEach((img) => {

      if (curr_img != img) {
        gsap.to(img.querySelector(".text"), {
          opacity: 0,
          duration: 0.3,
          ease: "none"
        })
      }

      gsap.to(img.querySelector(".text"), {
        left: '30px',
        duration: 0.3,
        delay: 0.4,
        ease: "none"
      })

    })
  } else {

    cols.forEach(col => {
      gsap.to(col, {
        border: "0.01px solid rgba(0,0,0,0.14)",
        duration: 0.4,
        delay: 1.8,
        ease: "ease"
      })
    })
    images.forEach((img) => {

      gsap.to(img.querySelector(".text"), {
        opacity: 1,
        duration: 0.3,
        delay: 1.5,
        ease: "none"
      })
      // gsap.to(img.querySelector(".text"), {
      //   left: 0,
      //   duration: 0.3,
      //   ease: "none"
      // })


    })
  }


}




let tl
grid.addEventListener("click", (e) => {

  gsap.set(span, {
    opacity: 1
  })

  if (!activated) {
    tl = gsap.timeline()
    const image_elem = images[e.target.dataset.index]
    console.log(image_elem.getBoundingClientRect().left, left)
    tl.to(images[e.target.dataset.index], {
      width: width,
      left: -(image_elem.getBoundingClientRect().left - left),
      duration: 2,
      ease: "power4.inOut",
    })
    tl.pause()
  }

  if (!activated) {
    startFullScreen(images[e.target.dataset.index], activated)
    tl.play();
    activated = true
  } else {
    gsap.to(span, {
      opacity: 0,
      y: 10,
      ease: "none",
      duration: 0.8,

    })
    tl.reverse()
    startFullScreen(images[e.target.dataset.index], activated)

    activated = false
  }
})
