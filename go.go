package main

import (
	"fmt"
)

func main() {
	// c := make(chan bool)
	// go func() {
	// 	fmt.Println("")
	// 	c <- true
	// }()
	// <-c
	defer fmt.Println(0)
	fmt.Println(1)
	go fmt.Println(2)
}
