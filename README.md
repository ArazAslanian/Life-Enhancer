# Life-Enhancer

During the semester, I have been learning a lot about user-experience, IoT devices, and how they claim to be making our lives easier.

I started getting annoyed with how useless some IoT devices are. I also started thinking a lot about how those IoT devices make us even more dependent on technology, and as a result we might get even more addicted to them.

Therefore, I decided to make an IoT device that actually makes your life worse, to raise awareness about all the concerns above by building a “smart” watch.

My watch will always remind you to check your phone, to make your addiction to your phone even worse. Sometimes it goes off even when there are no new notifications, just to take you out of whatever social setting you are in.

I did not actually build the watch, but I build an interactive advertisement experience for users to see what my watch does. The IoT device in this ad demonstrated how the watch would work.

I ironically called my watch the Life Enhancer, and the logo was a ghost, because this watch will take you away from the physical world, and make you even more addicted to your phone. 

Experience Description:
The web server starts by introducing the watch (see Software System Diagram), the images and narration show how this could be as a great excuse to take study breaks, as it vibrates at the most convenient times (all the time) and makes you check your phone. 

Using a timer, I control when the watch vibrates. On the Arduino side, a tilt sensor is used so that when the user mimics the act of looking at a watch, a signal is sent to the web server and an image of the watch is displayed on the screen.

When the user checks their watch, they are told to press the red button, which shows them what is on their phone by displaying a screenshot of their phone on the browser.

The ad walks the user through different scenarios of how this watch is the best watch ever, and how everyone should buy it. Users really liked the concept of my watch, and my project sparked up conversations about how technology is affecting our lives.

What was hard:
I ran into problems when trying to send a message only once, so that it does not keep firing, and used counters and booleans to fix that problem. Other than that, I had problems with soldering, as I was an unexperienced solderer. Eventually I figured out that my connections were weak and I fixed them. During the exhibition, my Arduino shield stopped working (possibly because my wires were too long and there was a lot of pressure on them when they were in my enclosure. Luckily, I had a back up shield and was able to get my IoT device up and running for the show. I learned that I should always have back up plans, because things could go wrong any time!
