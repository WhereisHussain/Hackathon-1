---
sidebar_position: 2
---

# Chapter 1: Fundamentals of Humanoid Robotics

In this chapter, we delve into the core principles that define humanoid robotics and the challenges of creating machines that move and interact like humans.

## Hardware Architecture

A humanoid robot is a complex system of sensors, actuators, and controllers. Unlike a industrial robotic arm fixed to a base, a humanoid is a mobile, untethered platform that must balance itself.

### The Kinematic Chain
The body of a humanoid is modeled as a series of rigid links connected by joints. This structure is known as a kinematic chain. 
- **Degrees of Freedom (DoF)**: Each joint adds one or more DoF to the robot. A human-like arm typically has 7 DoF (3 at the shoulder, 1 at the elbow, and 3 at the wrist).
- **End Effectors**: These are the "hands" or tools at the end of the kinematic chain.

## Sensing and Perception

For a robot to navigate, it must first "see" and "feel".
- **Vision**: Stereo cameras provide depth perception, while RGB cameras help identify objects.
- **Inertial Measurement Units (IMUs)**: Essential for balance, IMUs measure acceleration and angular velocity.
- **Force/Torque Sensors**: Located in the feet and hands, these help the robot understand how much pressure it is applying to the ground or an object.

## The Challenge of Balance

Standing and walking on two legs is an act of "controlled falling".
- **Center of Mass (CoM)**: The point where the entire mass of the robot is concentrated.
- **Zero Moment Point (ZMP)**: A critical concept in bipedal balance. To remain stable, the ZMP must stay within the robot's support polygon (the area covered by its feet).

## Software and AI

The "brain" of the robot must process sensor data in real-time to generate motor commands. Modern humanoids use a combination of:
- **Classical Control**: For low-level motor PID loops and stability.
- **Reinforcement Learning**: For complex gait generation and object manipulation.
- **Vision-Language-Action (VLA) Models**: Integrating high-level reasoning with physical movement.
