---
layout: post
title: BOIDS
excerpt: "A short introduction to boids using javascript."
modified: 2017-07-01T14:17:25-04:00
categories: blog
tags: [boids]
image:
  feature: /blog/boids/boids_cover.png
comments: true
share: true
---

> Learn the rules like a pro, so you can break them like an artist.

## What are Boids?

Boids are the name given to agents (The individual birds) in a simulation designed to replicate the flocking behavior of birds. What makes Boids special is that replicate a big group flock by having each individual agent follow three simple rules.

Boids are a nice example of emergent behavior, where the interaction of individual agents following simple rules creates complex group behavior. 

<div id="myCanvas"></div>
<script src="/js/lib/p5/p5.js"></script>
<script src="/js/lib/p5/addons/p5.dom.js"></script>
<script src="/js/lib/p5/addons/p5.sound.js"></script>
<script src="/js/p5Sketches/boids.js" type="text/javascript"></script>

## The Three <s>Seashells</s> Rules Explained

The most basic Boids model follows the following three rules:

* Separation: steer away from other boids that are too close.
* Alignment: steer your heading so you are facing the average direction of your closest Boid mates.
* Cohesion: Steer your position/velocity so you are moving in the same direction as your closest Boid mates.

If these rules don't immediately make sense don't worry we are going to break each one down now and look at how to implement them in Javascript.

#### Separation
Let's look at separation as our first rule. Just like in every day separation it's very important that our Boids adhere to this rule. This is what is going to keep our agents from occupying the same physical space and overlapping each other. Intuitively it makes sense too, if you think about birds flying in the sky in formation, although they have to stay in their spots you don't see them smacking into each other all the time. This is what we are replicating here.

The idea here is we are going to define a distance around the agent that is its personal space. So in the code below that's the 'desiredseperation' variable.

Once we know what our personal space is we want to know how many personal space invaders are lurking in that space. That's what the for loop is for. This implementation is pretty crude since it just goes through all the Boids. However, you could get clever and use fancy data structures to smartly check who is your personal space.

So what do we do if we find someone in our personal space? That's easy. We make a vector pointing away from that other agent so we can high tail it out of there and get away from them. That's what the if statement is doing. 
Hang on though because that's not all it is doing. See the line 'steer.add(diff);' This line is important, it's adding the vector you just made to a storage place and keeping track of it. The reason for this is because once we have all our vectors pointing away from everyone in our personal space we are going to add them ALL up and then use that new vector as the direction we run in. This was we escape from as many personal space invaders as possible at once.

And that is all there is to it really. The last if statement is all about normalizing the vector you want to move in so you don't go crazy and turn or move some unrealistic amount.

```js
Boids.separate = function(boids) {
  // How much personal space do we want?
  var desiredseparation = 25.0;
  // The average direction we will turn to run in.
  var steer = createVector(0, 0);
  // How many personal space invaders are lurking in our space.
  var count = 0;

  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary 
    // amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // Keep track of how many
    }
  }
  // At this point we have a vector pointing away from all the other 
  // boids in our personal space.
  // Now normalize that vector based on the number of boids that were in 
  // the space. (This is the same as taking an average)
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0 then it needs to be normalized 
  // so the boid doesn't turn a silly amount.
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }

  //We still have other rules to apply so we return this value 
  //rather than just moving the Boid now.
  return steer; 
}
```

#### Alignment

Great, so now we have a bunch of Boids that scatter when they go near each other. Let's try and make them a little less introverted and give them rules for playing with each other. Specifically, we are going to implement alignment. Now alignment and cohesion are a little similar and can get confusing so I'm going to try and make the distinction as clear as I can.

Cohesion is all about getting a local cluster of Boids to move in towards the average position of the cluster. So you can think of it as the opposite action of separation.

Alignment though which is what we are concerned with here, is all about 'steering' the cluster towards the average heading. This is what gets the group moving around the environment. Cohesion gets the cluster to bunch up and alignment gets them all traveling about the place in the same direction.

So looking at the code below we can immediately see that distance has been defined just like with separation. This one isn't about personal space though and is the distance we are going to look around us to see which way everyone else is going so we can follow.

The next for loop is a little bit more interesting. We are checking the distance between us and our neighbors to see if we care about them and if we do, we are adding their 'velocity' to a temporary vector. Right now we only check their position to see if we care about them and if we do, then we want to try and match their direction and speed. 

The final 'if check' is taking the sum of all the velocities and averaging them out so we go in the direction of the group and not just one or two Boids in the group.

```js
Boids.align = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0, 0);
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}
```

#### Cohesion

Our final rule is Cohesion. We touched on it in the section above where we said it is all about getting a local cluster of Boids to move in towards the average position of the cluster. So this is the rule that counters the separation and keeps the group together. 

The code is very similar to the adhesion code but instead of summing velocity vectors we sum the position vectors. By averaging this out we get the center point of the group and by having each agent move towards it they all try and form a big group huddle. Then separation stops them all bumping into each other. Finally, Adhesion gets the group moving and we get a cluster of agents moving as a joined blob around a space.

```js
Boids.cohesion = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum); // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}
```

##  Beyond the basics


