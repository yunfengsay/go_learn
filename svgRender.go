package main

import (
	"fmt"
	"math"
	"net/http"
)

const (
	width, height = 600, 320
	cells         = 50
	xyrange       = 30.0
	xyscale       = width / 2
	zscale        = height * 0.4
	angle         = math.Pi / 6
)

var sin30, cos30 = math.Sin(angle), math.Cos(angle)

func main() {
	http.HandleFunc("/", renderSvg)
	http.ListenAndServe(":9999", nil)

}

func renderSvg(w http.ResponseWriter, r *http.Request) {
	svgString := makeSvgString()
	// w.Header().Set("Content-Type", "image/svg+xml")
	w.Write([]byte(svgString))
}

func makeSvgString() string {
	var a string
	// a += "<?xml-stylesheet type='text/css' href='book.css'?>"
	a += "<!DOCTYPE html><html>"
	a += fmt.Sprintf("<svg xmlns='http://wwww.w3.org/2000/svg' "+
		"style='stroke:grey;fill:white;stroke-width:0.7' "+
		"width='%d' height='%d' >", width, height)
	for i := 0; i < cells; i++ {
		for j := 0; j < cells; j++ {
			ax, ay := corner(i+1, j)
			bx, by := corner(i, j)
			cx, cy := corner(i, j+1)
			dx, dy := corner(i+1, j+1)
			a += fmt.Sprintf("<polygon points='%g,%g,%g,%g %g,%g,%g,%g' />\n", ax, ay, bx, by, cx, cy, dx, dy)
		}
	}
	a += "</svg>"
	a += "</html>"
	return a
}

func corner(i, j int) (float64, float64) {
	x := xyrange * (float64(i)/cells - 0.5)
	y := xyrange * (float64(j)/cells - 0.5)
	z := f(x, y)
	sx := width/2 + (x-y)*cos30*xyscale
	sy := height/2 + (x+y)*sin30*xyscale - z*zscale
	return sx, sy
}
func f(x, y float64) float64 {
	r := math.Hypot(x, y)
	return math.Sin(r) / r
}
