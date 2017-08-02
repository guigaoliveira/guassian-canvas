
const gaussian = (mean, sigma) => ({
  mean, 
  sigma, 
  a : 1 / Math.sqrt(2 * Math.PI)
})
const exp = val => (Math.E ** val)
const divide = (n1, n2) => n1 / n2 
const addtoSigma = (obj, value) => Object.assign(obj, { sigma: obj.sigma + value })
const compute = ({ a, sigma, mean }, valueX) => divide(a, sigma) * exp((divide(-0.5 * (valueX - mean), sigma) ** 2))
const generateValues = (obj, start, end) => {
  const step = 0.08
  const len = (Math.abs(start) + Math.abs(end))/(step) 
  const allValues = [...Array(len)].map((val, index) => compute(obj, start + (index * step))) 
  return allValues
}
const draw = (obj, ctx, width, height) => {
    const points = generateValues(obj, -10, 10)
    const len = points.length
    ctx.clearRect(0, 0, width, height)
    ctx.strokeStyle = "blue"
    ctx.shadowBlur = 30
    ctx.lineWidth = 1;
    ctx.shadowColor = "black"
    ctx.beginPath()
    points.map((p, i) => ctx.lineTo( width * i/len + 2, height - 2 - (height*p) ))
    ctx.stroke()
}

const gauss = gaussian(0,1)
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const showGraph = () => {
  document.querySelector("span").textContent = `Standard Deviation:` + `${gauss.sigma}`.substring(0, 3)
  draw(gauss, ctx, canvas.width, canvas.height)
}
const [up, down] = document.querySelectorAll("button")
up.addEventListener("click", () => { 
  addtoSigma(gauss, 0.1) 
  showGraph()
})
down.addEventListener("click", () => { 
  addtoSigma(gauss, -0.1)
  showGraph()
})

showGraph()