package main

import "fmt"

type index int

const (
	Key index = iota
	Id
)

func main() {
	fmt.Println(Key, Id)
}
