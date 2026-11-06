---
title: "About the course"
description: "Contents, main directions and motivation of the course."
polished: true
sources: [{"lecture":1,"pages":"1"}]
---
Most of this course is mathematics. A smaller part is computer science, and only a thin sliver is physics:

![Diagram: a large box labelled Math, with a smaller box Computer science at its bottom left and a thin sliver at the bottom right labelled Physics](../../../assets/figures/L01-p01-1.png "w=344")

The course assumes you know **linear algebra** and **probability**.

## Main directions

Work on quantum computing goes in three main directions:

1. **Experimental:** building quantum computers.
2. **Theoretical:** quantum algorithms and quantum information. Together, these two form the mathematical model of quantum computing.
3. **Practical:** quantum programming. In this course you program in Cirq, a Python library for quantum circuits; see the [programming exercises](/exercises/#programming-exercises).

## Motivation

1. **The world is quantum.** Information and computation are physical: every computer is a physical device, so better physics leads to better computers. Quantum mechanics is one of the most powerful and fundamental physical theories we have.
2. **Miniaturization.** Moore's law has slowed down. As the components of computer chips get smaller, quantum effects become unavoidable.
3. **Exploiting quantum phenomena.** Instead of only putting up with quantum effects, we can use them to compute. For some problems this gives a computational advantage, or **quantum speed-up**: quantum algorithms such as [Grover's algorithm](/notes/grover/) and [factoring via order finding](/notes/factoring/) are faster than the best known classical algorithms.

Throughout the course, *classical* simply means *not quantum*.
