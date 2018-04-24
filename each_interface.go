package main

import "fmt"

type Handler interface {
	Do(k, v interface{})
}

type Handlerfunc func(k, v interface{})

func (f Handlerfunc) Do(k, v interface{}) {
	f(k, v)
}
func Each(m map[interface{}]interface{}, h Handler) {
	if m != nil && len(m) > 0 {
		for k, v := range m {
			h.Do(k, v)
		}
	}

}

func EachFunc(m map[interface{}]interface{}, f func(k, v interface{})) {
	Each(m, Handlerfunc(f))
}

type welcome string

func (w welcome) Do(k, v interface{}) {
	fmt.Printf("%s, 我是 %s 今年%d岁\n", w, k, v)
}
func (w welcome) selfInfo(k, v interface{}) {
	fmt.Printf("%s, 我是 %s 今年%d岁\n", w, k, v)
}
func selfInfo(k, v interface{}) {
	fmt.Printf("大家好,我叫%s,今年%d岁\n", k, v)
}
func main() {
	persions := make(map[interface{}]interface{})
	persions["yoona"] = 28
	persions["yunfeng"] = 26
	var w welcome = "美女们好"
	Each(persions, w)
	Each(persions, Handlerfunc(w.selfInfo))
	EachFunc(persions, selfInfo)
	fmt.Println("我们是夫妻")
}
