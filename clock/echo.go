package main

import (
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"strings"
	"time"
)

func echo(c net.Conn, shout string, delay time.Duration) {
	fmt.Fprintln(c, "\t", strings.ToUpper(shout))
	time.Sleep(delay)
	fmt.Fprintln(c, "\t", shout)
	time.Sleep(delay)
	fmt.Fprintln(c, "\t", strings.ToLower(shout))
}

func mustCopy(dst io.Writer, src io.Reader) {
	fmt.Println("begin")
	io.Copy(dst, src)
	fmt.Println("end")
	// if _, err := io.Copy(dst, src); err != nil {
	// 	log.Fatal(err)
	// }
}

func main() {
	conn, err := net.Dial("tcp", "localhost:8999")
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()
	go mustCopy(os.Stdout, conn)
	mustCopy(conn, os.Stdin)
}
