package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

func main() {
	mux := http.NewServeMux()
	mux.Handle("/", &myHandler{})
	log.Fatal(http.ListenAndServe(":7878", mux))
}

type myHandler struct{}

func (*myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	body := Get(w, r)
	w.Write([]byte(body))
}

func Get(w http.ResponseWriter, r *http.Request) []byte {
	url := getUrl(r.URL.String())
	resp, err := http.Get(url)
	panicErr(err)

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	panicErr(err)
	return body
}

func getUrl(url string) string {
	url = url[1:]
	if strings.HasPrefix(url, "http") {
		return "http://" + url[6:]
	}
	if strings.HasPrefix(url, "https") {
		return "https://" + url[7:]
	}
	return url
}

func panicErr(e error) {
	if e != nil {
		log.Println(e)
		panic(e)
	}
}
