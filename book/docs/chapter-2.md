---
sidebar_position: 3
---

# Chapter 2: Humanoid Kinematics and Dynamics

To move a robot, we must understand the relationship between its joint movements and the resulting position of its body in space.

## Forward Kinematics (FK)

Forward kinematics is the process of calculating the position and orientation of the end-effector (like a hand or foot) given the joint angles.
- **Denavit-Hartenberg (DH) Parameters**: A standard convention for attaching coordinate frames to joints.
- **Transformation Matrices**: 4x4 matrices used to represent rotation and translation between links.

## Inverse Kinematics (IK)

Inverse kinematics is the reverse: given a desired position in 3D space, what should the joint angles be?
- **Analytical Solutions**: Fast but only possible for simple robotic structures.
- **Numerical Solutions**: Iterative methods (like Jacobian Transpose or IK solvers) used for complex humanoid chains.

## Dynamics: Force and Motion

While kinematics deals with the geometry of motion, dynamics accounts for the forces that cause it.
- **Inertia and Gravity**: A humanoid must constantly fight gravity.
- **Torque Control**: Calculating exactly how much current to send to each motor to achieve a desired acceleration.

## Task: Visualizing a 2-DOF Link
Suppose we have a 2-joint arm in 2D space. The coordinates (x, y) can be calculated as:
$x = l1 \cos(\theta 1) + l2 \cos(\theta 1 + \theta 2)$
$y = l1 \sin(\theta 1) + l2 \sin(\theta 1 + \theta 2)$
