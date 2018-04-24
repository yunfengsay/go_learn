package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.Handle("/", &myHandler{})
	log.Fatal(http.ListenAndServe(":7878", mux))
}

type myHandler struct{}

func (*myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// for {
	// 	w.Write([]byte("asdf"))
	// }
	go handlerClick()

}

func handlerClick() []byte {
	resp, _ := http.Get("http://www.baidu.com")
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(body)
	return []byte(body)
}

func panicErr(e error) {
	if e != nil {
		log.Println(e)
		panic(e)
	}
}
