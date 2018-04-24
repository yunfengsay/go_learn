package main

import (
	"fmt"
)

type TZ int

type USB interface {
	Name() string
	Connecter
}

type Connecter interface {
	Connect()
}

type PhoneConnecter struct {
	name string
}

func (pc PhoneConnecter) Name() string {
	return pc.name
}

func (pc PhoneConnecter) Connect() {
	fmt.Printf("Connect: %s ", pc.name)
}

func Disconnect(usb USB) {
	// if pc, ok := usb.(PhoneConnecter); ok {
	// 	fmt.Println("Disconnected: ", pc.name)
	// 	return
	// }
	switch v := usb.(type) {
	case PhoneConnecter:
		fmt.Println("Disconnected: ", v.name)
	default:
		fmt.Println("Unknnow Device.")
	}
}

func (tz *TZ) Increase(num int) {
	*tz += TZ(num)
}

func main() {
	var a TZ
	a.Increase(100)
	fmt.Println(a)

	var b USB
	b = PhoneConnecter{"yunfeng·s pc"}
	b.Connect()
	Disconnect(b)
}
