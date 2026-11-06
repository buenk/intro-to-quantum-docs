---
title: "Probabilistic bits"
description: "Probabilistic bits, operations on them, and measurement."
polished: true
sources: [{"lecture":1,"pages":"2-6"}]
exercisesLink: "/exercises/foundations/#probabilistic-bits"
---
Before we get to quantum bits, it helps to look at their closest classical relative: a bit whose value is random. Several ideas we will need for qubits show up here first, in a simpler setting: states written as vectors, operations written as matrices, and measurement.

## What is a probabilistic bit?

A probability is a number between 0 and 1 that says how likely something is. A probability of 0 means the event never happens, a probability of 1 means it always happens, and the values in between run from "sometimes" to "often":

![Number line from 0 to 1 with tick marks labelled never, sometimes, often, always](../../../assets/figures/L01-p02-1.png "w=540")

An ordinary bit is either 0 or 1. A probabilistic bit is a bit whose value is random:

:::definition[Probabilistic bit]
A **probabilistic bit** is a bit that is

$$
\begin{cases}
0 & \text{with probability } p_0, \\
1 & \text{with probability } p_1,
\end{cases}
$$

where $p_0, p_1 \geq 0$ and $p_0 + p_1 = 1$.
:::

The two conditions say that probabilities are never negative, and that the bit always takes one of the two values.

:::example[Random coin]
A coin toss is a probabilistic bit with $p_0 = p_1 = \frac{1}{2}$: both sides are equally likely.
:::

Since $p_1 = 1 - p_0$, the single number $p_0$ already describes the whole bit.

### Vector notation

It is convenient to collect the two probabilities in a vector and split it into two parts:

$$
\begin{pmatrix} p_0 \\ p_1 \end{pmatrix} = p_0 \begin{pmatrix} 1 \\ 0 \end{pmatrix} + p_1 \begin{pmatrix} 0 \\ 1 \end{pmatrix}
$$

The two vectors on the right describe bits that are not random at all: a bit that is 0 with certainty, and a bit that is 1 with certainty. These are the **deterministic states**, and we write them as circled numbers:

$$
\textcircled{0} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \qquad\qquad \textcircled{1} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}
$$

So every probabilistic bit is a mix of the two deterministic states, with the probabilities as weights. For the coin:

$$
\underbrace{\textcircled{?}}_{\text{random coin}} = p_0 \underbrace{\textcircled{0}}_{\text{``heads''}} + p_1 \underbrace{\textcircled{1}}_{\text{``tails''}}
$$

## Probabilistic information is information too

Why bother with exact probabilities instead of just saying "we don't know"? Because a probability tells you more than a plain yes, no or unknown.

:::example[Party planning]
You invite five friends to a party. Some have replied, some have not. Next to each reply, you also write down how likely you think it is that the person actually comes:

| Name | Coming? | Chances? |
|------|---------|----------|
| John | Y | 0.1 |
| Sarah | N | 0.1 |
| Peter | — | 0.8 |
| Anna | — | 0.5 |
| Tom | Y | 0.6 |
| **Total** | **2–4** | **2.1** |

The replies alone only tell you that 2 to 4 people will come, which is a wide range. Adding up the chances gives 2.1, the number of guests you can expect, which is a much more informed estimate. The chances can even disagree with the replies: John said yes, but you give him only a 10% chance of showing up.
:::

## Operations on probabilistic bits

What can we do with a probabilistic bit? The simplest operation is to invert it, like turning a coin over. On the deterministic states, NOT swaps 0 and 1:

$$
\mathrm{NOT}\ \textcircled{0} = \textcircled{1} \qquad\qquad \mathrm{NOT}\ \textcircled{1} = \textcircled{0}
$$

or, in vector notation:

$$
\mathrm{NOT} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix} \qquad\qquad \mathrm{NOT} \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}
$$

But what should NOT do to a bit that is random? We **extend it by linearity**: NOT acts on each deterministic state separately, and the probabilities stay as weights:

$$
\boxed{\mathrm{NOT}\left[ p_0 \begin{pmatrix} 1 \\ 0 \end{pmatrix} + p_1 \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right] = p_0\, \mathrm{NOT} \begin{pmatrix} 1 \\ 0 \end{pmatrix} + p_1\, \mathrm{NOT} \begin{pmatrix} 0 \\ 1 \end{pmatrix}}
$$

Working this out, the two probabilities swap places:

$$
\mathrm{NOT} \begin{pmatrix} p_0 \\ p_1 \end{pmatrix} = p_0 \begin{pmatrix} 0 \\ 1 \end{pmatrix} + p_1 \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} p_1 \\ p_0 \end{pmatrix}
$$

This matches intuition. With probability $p_0$ the bit is $\textcircled{0}$ and NOT turns it into $\textcircled{1}$. With probability $p_1$ the bit is $\textcircled{1}$ and NOT turns it into $\textcircled{0}$.

Because NOT is linear, we can write it as a matrix, and applying NOT becomes matrix–vector multiplication:

$$
\mathrm{NOT} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \quad\text{since}\quad \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \cdot \begin{pmatrix} p_0 \\ p_1 \end{pmatrix} = \begin{pmatrix} p_1 \\ p_0 \end{pmatrix}
$$

## Adding and multiplying probabilities

Two rules for combining probabilities come up again and again:

- **Multiply** when you have two *independent* events and want the probability that *both* happen.
- **Add** when a single event has several possible outcomes and you want the probability that *any* of them happens. You group those outcomes together and don't care which one occurred.

:::example[Looking at a watch]
Look at a watch at a random moment. Each of the 12 hours is equally likely, each of the 60 minutes is equally likely, and the hour and the minute are independent of each other.

- For the time to be 8:23, the hour must be 8 *and* the minute must be 23, so we multiply: $\frac{1}{12} \cdot \frac{1}{60} = \frac{1}{720}$.
- For the hour hand to point to a prime number, it must point to 2, 3, 5, 7 *or* 11, so we add: $\frac{1}{12} + \frac{1}{12} + \frac{1}{12} + \frac{1}{12} + \frac{1}{12} = \frac{5}{12}$.
:::

## Measuring a probabilistic bit

How do we find out the value of a probabilistic bit? Think of a coin that you have flipped and covered with your hand as soon as it lands. You don't know which side is up. All you know is that each side has a chance of $\frac{1}{2}$, so you describe the coin by the uniform distribution $\begin{pmatrix} 1/2 \\ 1/2 \end{pmatrix}$.

Uncovering the coin and looking at it is a **measurement**. You see one of two **outcomes**, each with its own probability:

![Diagram: the state (p0, p1) with an arrow labelled p0 to the outcome 0 and an arrow labelled p1 to the outcome 1; note: measurement outcome and the new state of the coin](../../../assets/figures/L01-p06-1.png "w=607")

Looking at the coin also changes its state. After the measurement, the state is no longer $\begin{pmatrix} p_0 \\ p_1 \end{pmatrix}$ but $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ or $\begin{pmatrix} 0 \\ 1 \end{pmatrix}$, depending on the outcome. Measuring again gives the same outcome and does not change the state any further.

:::note[Important]
A measurement does not give you the values of $p_0$ and $p_1$. All you get is a single 0 or 1, and a new state that no longer contains any information about $p_0$ and $p_1$.
:::
