var colors = require('colors')
var diagonal_resolution_px,
    ppi,
    total_megapixels,
    android_category,
    aspect_ratio,
    aspect,
    ratio_info = 
      [{
        "decimalValue": 1, 
        "aspect": "(1:1)"
      },
      {
        "decimalValue": 1.19, 
        "aspect": "(19:16)"
      },
      {
        "decimalValue": 1.25,
        "aspect": "(5:4)"
      },
      {
        "decimalValue": 1.33,
        "aspect": "(4:3, 12:9)"
      },
      {
        "decimalValue": 1.37,
        "aspect": "(11:8)"
      },
      {
        "decimalValue": 1.50,
        "aspect": "(3:2, 15:10)"
      },
      {
        "decimalValue": 1.55,
        "aspect": "(14:9)"
      },
      {
        "decimalValue": 1.60,
        "aspect": "(8:5, 16:10)"
      },
      {
        "decimalValue": 1.75,
        "aspect": "(7:4)"
      },
      {
        "decimalValue": 1.77,
        "aspect": "(16:9, 42:32)"
      },
      {
        "decimalValue": 2.20,
        "aspect": "(11:5, 22:10)"
      },
      {
        "decimalValue": 2.37,
        "aspect": "(64:27, 43:33)"
      },
      {
        "decimalValue": 2.39,
        "aspect": "(~12:5)"
      },
      {
        "decimalValue": 2.55,
        "aspect": "(~23:9)"
      },
      {
        "decimalValue": 2.59,
        "aspect": "(~13:5)"
      },
      {
        "decimalValue": 2.66,
        "aspect": "(8:3, 24:9)"
      },
      {
        "decimalValue": 2.76,
        "aspect": "(~11:4)"
      }]

if (process.argv.length != 5) {
  console.log("wrong arguments has been provided, please provide width, height "
    + "in pixels and diagonal size in inches on that order")
}
else {
  width_px = Number(process.argv[2])
  height_px = Number(process.argv[3])
  diagonal_size_inches = Number(process.argv[4])

  diagonal_resolution_px = Math.sqrt(Math.pow(width_px,2) + Math.pow(height_px,2))
  ppi = Math.round(diagonal_resolution_px/diagonal_size_inches)
  total_megapixels = (width_px * height_px)/1000000
  
  aspect_ratio = (width_px > height_px) 
                  ? width_px/height_px
                  : height_px/width_px 

  aspect_ratio = Math.floor(aspect_ratio * 100)/100
  
  for (var i = 0; i < ratio_info.length; i++){
      if (ratio_info[i].decimalValue == aspect_ratio){
        aspect = ratio_info[i].aspect
      }
  }

  if (ppi < 120){
    android_category = "LDPI"
  } else if (ppi < 160) {
    android_category = "MDPI"
  } else if (ppi < 213) {
    android_category = "TVDPI"
  } else if (ppi < 240) {
    android_category = "HDPI"
  } else if (ppi < 320) {
    android_category = "XHDPI"
  } else if (ppi < 480) {
    android_category = "XXHDPI"
  } else if (ppi < 640) {
    android_category = "XXXHDPI"
  } else {
    android_category = "Higher than XXXHDPI"
  }

  console.log("       Width: ".gray + width_px + " px".green)
  console.log("       Height: ".gray + height_px + " px".green)
  console.log("       Screen Size: ".gray + diagonal_size_inches + " inches".green)
  console.log("       PPI: ".gray + ppi)
  console.log("       Aspect Ratio: ".gray + aspect_ratio + " - ".cyan + aspect)
  console.log("       Android Category: ".gray + android_category)
  console.log("       Total MegaPixels: ".gray + total_megapixels.toFixed(1))
}