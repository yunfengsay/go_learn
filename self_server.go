package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func SendGet(url string) []byte {
	resp, err := http.Get("http:/" + url)
	defer resp.Body.Close()
	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("错误❌ ", err)
	}
	return b
}
func SendPost(url string) string {
	client := &http.Client{}

	req, err := http.NewRequest("POST", "http://www.01happy.com/demo/accept.php", strings.NewReader("name=cjb"))
	if err != nil {
		// handle error
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Cookie", "name=anny")

	resp, err := client.Do(req)

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		// handle error
	}

	fmt.Println(string(body))
	return string(body)
}
func MiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println(c.Request.Header)
		// fmt.Println(c.Request.URL)
		// fmt.Println(c.Request.Method)
		fmt.Println(c.Request.Body)
		var result []byte
		if c.Request.Method == "GET" {
			result = SendGet(c.Request.URL.String())
		} else {

		}

		c.JSON(http.StatusOK, gin.H{
			"result": result,
		})
		c.Next()
	}
}

func main() {

	router := gin.Default()
	router.Use(MiddleWare())
	// router.GET("/", func(c *gin.Context) {
	// 	c.String(http.StatusOK, "Hello World")
	// })
	router.Run(":9000")
}
