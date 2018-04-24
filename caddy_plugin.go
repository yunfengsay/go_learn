package myloader
import "github.com/mholt/caddy"

func init(){
	caddy.RegisterCaddyfileLoader("myloader", caddy.LoaderFunc(myLoader))
}

func myLoader(serverType string)(caddy.Input, error){
	return nil, nil
}
