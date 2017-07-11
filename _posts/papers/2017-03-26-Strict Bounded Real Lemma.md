---
layout: post
title: "The Strict Bounded Real Lemma"
modified:
categories: papers
excerpt:
tags: []
image:
  feature:
comments: true
date: 2017-03-26T08:08:50-04:00

---

This article presents the strengthened version of the Bounded Real Lemma found in "A first principles solution to the non-singular \\( H^{\infty} \\) control Problem."
The result gives a strict $H^\infty$ norm bound for non-minimal realizations.

## 2. The Strict Bounded Real Lemma

Definition 2.1
  Consider an algebraic Riccati equation written in the form:
  $$
  \begin{align}
    A'X + XA - XMX + N = 0
  \end{align}
  $$

<div class="james" id="box1" markdown="1">
With some manipulation of (1), we can get back a Lyapunov equation.
$$ A'X + XA - XMX + N = 0 \\\\
   A'X - X'M'X +XA-XMX + N + X'M'X = 0 \\\\
   (A'-X'M')X + X(A-MX) + N+X'M'X = 0 \\\\
   (A-MX)'X + X(A-MX) + Q = 0
$$   

$A-MX$ must be symmetric and stable if $X$ is a solution of the Riccati equation.
</div>

A symmetric matrix $X$ which satisfies this Riccati equation is said to be a *stabilizing solution* if $A-MX$ is stable. A symmetric matrix X which satisfies the equation is said to be a *strong solution* if $A-MX$ has no eigenvalues in the open right half plane.

Before diving into the Theorem a preliminary Lemma is needed.

<div class="lemma" id="lemma_2.1" markdown="1">
{:.lemma-box}
Lemma 2.1.

Suppose $A$ is stable and the Riccati equation
$$\begin{align}
  A'\tilde{P} + \tilde{P}A + \tilde{P}BB'\tilde{P} + \tilde{Q} = 0
\end{align}$$  
has a symmetric solution $\tilde{P}$. i.e ($\tilde{P} = \tilde{P}'$).

Lets also suppose $\tilde{Q} \geq Q \geq 0$.   

Then the Riccati equation
$$\begin{align}
  A'P + PA + PBB'P + Q = 0
\end{align}$$  
will have a unique strong solution P, where $0 \leq P \leq \tilde{P}$.
</div>

*Proof*  
Let $\tilde(K) = -\tilde{P}$. Hence Riccati equation (4) can be written as $A'\tilde{K} + \tilde{K}A - \tilde{K}BB'\tilde{K} - \tilde{Q}=0$.  
Since A is stable, the pair $(A,B)$ must be stabilizable. Hence, using a standard result on the monotonicity of Riccati solutions (Theorms 2.1 and 2.2 of ref 27), it follows that the Riccati equation $A'K + KA - KBB'K - Q$ will have a strong solution $K \geq \tilde(K)$. Now letting $ P = -K$, it follows that $P \leq \tilde{P}$ is the unique strong solution to (5). And from this we can conclude that $P \geq 0$ using Lemma 12.1.

<div class="lemma" id="lemma_12.1" markdown="1">
{:.lemma-box}
Lemma 12.1.

If $Q \geq 0$ and $A$ is stable, the linear equation
$$\begin{align}
  A'P + PA + Q = 0
\end{align}$$
has a unique solution $P$, and $P \geq 0$.
</div>

The main theorem is now discussed.

<div class="theorem" id="theorem_2.1" markdown="1">
{:.theorem-box}
*Theorem 2.1 (The Strict Bounded Real Lemma with non-minimal realizations)*  

The following statements are equivalent,    

1. A is stable and $$\|C(sI-A)^{-1}B\|_{\infty} < 1;$$


2. There exists a matrix $\tilde{P} > 0$ such that $$
\begin{align}
  A'\tilde{P} + \tilde{P}A + \tilde{P}BB'\tilde{P} + C'C < 0
\end{align} $$


3. The Riccati equation $$
\begin{align}
  A'P + PA + PBB'P + C'C = 0
\end{align} $$    
      has a stabilizing solution $P \geq 0$.  

If any of these statements hold then $ P < \tilde{P} $. This means if a stabilizing solution exists, it is always positive definite.
</div>

{:.james}
A is stable and
$$
||C(sI-A)^{-1}B||_{\infty} < 1
$$.  
This implies that the largest gain in the frequency domain is less than 1. This makes sense if we want a bounded time domain response.

Proof of Theorem 2.1

First we need to establish the equivalence of the three statements.

We will begin by looking at statement one and showing it is true and how it implies statement two.

---

$ (i) \implies (ii)$: The first statement says that the H infinity norm of the transfer function is less than 1 and A is stable for a stabilizing solution.
It then follows from this that we can write the result as,

$$\begin{align}
  \|C(sI-A)^{-1}B\|_{\infty} \leq [C(sI-A)^{-1}B][C(sI-A)^{-1}B]' &\leq 1  \notag \\
  C(jwI-A)^{-1}BB'(-jwI-A')^{-1}C' &\leq (1-\epsilon)I
\end{align}$$

For an $\epsilon \geq 0$ and for all $\omega \geq 0$.

We will now apply a similar process to work towards our result.
Let $\mu := ||C(sI-A)^{-1}||_{\infty}$. (Note the absence of $B$) Hence,

$$\begin{align}
  C(jwI-A)^{-1}(-jwI-A')^{-1}C' &\leq (\mu^2)I
\end{align}$$  
We can rearrange this and multiply both sides by $\frac{\epsilon}{2}$ to get,

$$\begin{align}
  \frac{\epsilon}{2\mu^2}C(jwI-A)^{-1}(-jwI-A')^{-1}C' &\leq \frac{\epsilon}{2}I
\end{align}$$  
for all $\omega \geq 0$.

What we do now is we add equations (8) and (9) to get,

$$\begin{align}
  C(jwI-A)^{-1}\tilde{B}\tilde{B}'(-jwI-A')^{-1}C' &\leq (1-\frac{\epsilon}{2})I
\end{align}$$  

Where we have defined $\tilde{B}$ to be the non singular matrix defined by
$$\begin{align*}
\tilde{B}\tilde{B}' = BB' + \frac{\epsilon}{2\mu^2}I
\end{align*}$$

We note that if we take the transpose of the last equation it implies,

$$\begin{align}
  \tilde{B}'(-jwI-A')^{-1}C'C(jwI-A)^{-1}\tilde{B} &\leq (1-\frac{\epsilon}{2})I
\end{align}$$  

Now we are going to do a similar thing and define,
$$\begin{align*}
\eta := \|(sI-A)^{-1}\tilde{B}\|_{\infty}
\end{align*}$$
Hence using the same process as last time we get,

$$\begin{align}
  \frac{\epsilon}{2\eta^2}\tilde{B}'(-jwI-A')^{-1}(jwI-A)^{-1}\tilde{B} &\leq \frac{\epsilon}{2}I
\end{align}$$  
for all $\omega \geq 0$. Again we add equations and add equations (11) and (12) to get,

$$\begin{align*}
  \tilde{B}'(-jwI-A')^{-1}C'C(jwI-A)^{-1}\tilde{B} &\leq (1-\epsilon)I
\end{align*}$$

Where $\tilde{C}$ is a non-singular matrix defined so that
$$\begin{align*}
\tilde{C}'\tilde{C} = C'C + (\frac{\epsilon}{2\eta^2})I
\end{align*}$$

So finally we have shown that
$$\begin{align*}
\|\tilde{C}(sI-A)^{-1}\tilde{B}\|_{\infty} \leq 1
\end{align*}$$
Furthermore, since $\tilde{B}$ and $\tilde{C}$ are non-singular, the triple $(A,\tilde{B},\tilde{C})$ is minimal.

Using the standard non strict Bounded Real Lemma, it follows that there exists a $\tilde{P} > 0$ such that $A'\tilde{P} + \tilde{P}A + \tilde{P}\tilde{B}\tilde{B}'\tilde{P} + \tilde{C}'\tilde{C} = 0$.

If we use this result and sub in our values for
$$\begin{align*}
\tilde{C}'\tilde{C} = C'C + (\frac{\epsilon}{2\eta^2})I
\end{align*}$$ and $$\begin{align*}
\tilde{B}\tilde{B}' = BB' + \frac{\epsilon}{2\mu^2}I
\end{align*}$$ we can do some algebra to get,

$$\begin{align*}
A'\tilde{P} + \tilde{P}A + \tilde{P}BB'\tilde{P} + C'C + \frac{\epsilon}{2\mu^2}\tilde{P}^2 + \frac{\epsilon}{2\eta^2}I= 0
\end{align*}$$

As we know $(\frac{\epsilon}{2\mu^2}\tilde{P}^2 + \frac{\epsilon}{2\eta^2}I)$ is greater than zero,
$$\begin{align*}
A'\tilde{P} + \tilde{P}A + \tilde{P}BB'\tilde{P} + C'C < 0
\end{align*}$$

and we have arrived at our second statement.

---

$ (ii) \implies (iii)$: It follows from statement 2 that there exists matrices $\tilde{P}>0$ and $\tilde{R}>0$ such that,

$$\begin{align}
A'\tilde{P} + \tilde{P}A + \tilde{P}BB'\tilde{P} + C'C + \tilde{R} = 0
\end{align}$$

Hence, A is stable. Comparing equations (13) and (6), it follows from Lemma 2.1 that (6) will have a unique strong solution $P\leq\tilde{P}$. Since we know A is stable, it follows that $P\geq0$.

What we need to do now is establish that $P$ is the stabilizing solution to (6).

First we are going to let $ S := \tilde{P}-\tilde{P} \geq 0 $ and $\bar{A}' := A+BB'P$.

If we add equations (13) and (6) we get,

$$\begin{align}
\bar{A}'S + S\bar{A} + SBB'S +  \tilde{R} = 0
\end{align}$$

This is the equation we will use to show that $A+BB'P$ has no eigenvalues on the imaginary axis.
We are going to do this by contradiction.

Suppose $\bar{A}$ has an imaginary axis eigenvalue $j\omega$ with the corresponding eigenvalue $x$. That is $\bar{A}x = j\omega x$. Pre and post multiplying our previous equation by $x^*$ and $x$ we get the following equation after substitution,

$$\begin{align*}
-j\omega x^*Sx + j\omega x^*Sx + x^*SBB'Sx +  x^*\tilde{R}x = 0
\end{align*}$$

Since
$$\begin{align*}
x^*SBB'Sx
\end{align*}$$
and
$$\begin{align*}
x^*\tilde{R}x\end{align*}$$
are both $\geq 0$ this implies that,
$$\begin{align*}
x^*\tilde{R}x = 0
\end{align*}$$

This result can't be true though as it contradicts the fact that $\tilde{R}>0$.
This, $A + BB'P$ is stable and therefore $P\geq0$ is the stabilizing solution. This has brought us to the result of statement three.

---

$ (iii) \implies (i)$: Suppose $A'P+PA+PBB'P+C'C=0$ has a stabilizing solution $P\geq0$ holds and let $\tilde{C}:=B'P$. It follows then that $A + B\tilde{C} = A + BB'P$ is stable and therefore the pair $(A,\tilde{C})$ is detectable.

Furthermore it follows from $A'P+PA+PBB'P+C'C=0$ that $A'P+PA+\tilde{C}'\tilde{C}\leq0$.

<div class="james" id="box2" markdown="1">
This result comes from replacing $B'P$ with $\tilde{C}$ and realizing if P is a solution then $P=P'$ and therefore $PB=P'B=\tilde{C}'$. Since $C'C$ is positive-semidefinite then if we take it to the right hand side it becomes a negative and the left hand side must be $\leq0$.
</div>

What we have left is a Lyapunov equation and so we can conclude A is stable which is the first claim in part (i). We can conclude this because we have said $(A,\tilde{C})$ is detectable and therefore $e^{At}$ must be bounded and this only occurs if $A$ is stable.

In order to show that $\|\| C(sI-A)^{-1}B \|\|_{\infty} < 1$ we first observe that $A'P+PA+PBB'P+C'C=0$ implies,

$$\begin{align*}
  B'(-jwI-A')^{-1}C'C(jwI-A)^{-1}B = I - [I-B'P(-jwI-A)^{-1}B]'[I-B'P(jwI-A)^{-1}B]\\\\
  rhs = I - I + B'P(jwI-A)^{-1}B + B'(-jwI-A')^{-1}P'B  - B'(-jwI-A')^{-1}P'BB'P(jwI-A)^{-1}B
\end{align*}$$

<div class="james" id="box1" markdown="1">

Cancelling the $B'$ and $B$ on both sides we get,

$$\begin{align*}
  (-jwI-A')^{-1}C'C(jwI-A)^{-1} = P(jwI-A)^{-1} + (-jwI-A')^{-1}P'  - (-jwI-A')^{-1}P'BB'P(jwI-A)^{-1}
\end{align*}$$

Pre multiply both sides by $(-jwI-A')$ and post multiply by $(jwI-A)$ and remembering $P=P'$ we get,

$$\begin{align*}
  C'C &= (-jwI-A')P + P'(jwI-A) - P'BB'P \\
  C'C &= -jwP -A'P + jwP - PA - P'BB'P \\
  C'C &= -A'P - PA - P'BB'P \\
  A'P + PA + P'BB'P + C'C &= 0
\end{align*}$$    

Which is our original Riccati equation.

Since our left hand side is
$$\begin{align*}
  \| C(sI-A)^{-1}B\|_{\infty}
\end{align*}$$   
and we know
$$\begin{align*}
  [I-B'P(-jwI-A)^{-1}B]'[I-B'P(jwI-A)^{-1}B] \geq 0
\end{align*}$$  

We can say $$\begin{align*} \| C(sI-A)^{-1}B \|_{\infty} = 1 - n
\end{align*}$$  where $ n \geq 0 $.

</div>

Therefore,
$$\begin{align*}
  \| C(sI-A)^{-1}B \|_{\infty} \leq 1.
\end{align*}$$  

And this has brought us full circle back to condition 1.

---

Finally in order to complete the proof of the theorem, we will now suppose that all three statements hold. We now need to prove our last remark that $P<\tilde{P}$.

We have already shown that $P\leq\tilde{P}$ so lets suppose there is a vector $z$ such that $\tilde{P}:=P$ and they are related by $z'\tilde{P}z = z'Pz$.

Rearranged, this implies that $Sz=0$ using the definition of S given above. If we apply this fact to equation (14) in order for the equation to hold it follows that,
$$\begin{align*}
  z'\tilde{R}z = 0
\end{align*}$$  
This result again contradicts our statement that $\tilde{R}>0$ and therefore $P<\tilde{P}$ and our proof is complete.

This theorem has shown that not only is a solution X to the Riccati equation a strong solution if the matrix $A-MX$ has no eigenvalues in the open right half plane, but it is also a stabilizing solution and we can conclude it has no eigenvalues in the closed right half plane.
