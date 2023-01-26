A web app made to figma design from

https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB

I built it as just a quick little showcase of roughly what my code looks like since I don't really have anything else here public.

Putting it together was also kinda fun.

live site: https://kanban-example.vercel.app/

## next.js

I built the frontend using next. I think for this app in particular it didn't really offer anything that spectacular over just using react, but I just generally find working with it very enjoyable.

The api routes also allowed me to build what I think is a cleaner looking backend integration than if I simply called the supabase helpers directly from the client.

## supabase

Very comfy to use. I especially love the row level database security options, I imagine that with more complex schemas some issues can arise, but in my case the recursive application made this the smoothest experience ever. Also, them providing some really neat next.js helpers to use on the server so I don't have to manually fiddle with passing auth tokens through is just plain polite.

Their CLI offers some database typescript helpers that I didn't actually find all that useful given the small scope of this project but I the premise is also something I absolutely adore.

## 99.1% typescript

The styled components really make this seem like a css free app :p

I think I'm generally pretty strict with using typescript, but I also believe that in some cases it can become fighting with the compiler for the sake of it rather than for any actual safety or increased clarity. So while I think the typing is pretty good it is by no means perfect all the way through.

## other libraries

#zod 
I was sold at 'generate type from schema', genius feature

#swr
who needs state when I have a cache :p

#react-loader-spinner
I'll build a checkbox from scratch but at a certain point not using the react ecosystem feels like a crime

