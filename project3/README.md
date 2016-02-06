# boilerplate-stylus
With a SMACSS twist, inspired by Sassy-Starter
## zengardens fork
I decided to go for a zengardens theme that represented the different stages of the day
In order to do this, I decided that it would be necessary to create 4 distinct themes: morning, day, evening, and night. 
In order to facilitate this work flow, I came up with a script that would 
observe 4 different files that would inherit nearly all the same properties from 
the rest of the site, with the only difference being the parameter that is passed
to the `build_layout` function, which determines how the rest of the site will be styled. 
