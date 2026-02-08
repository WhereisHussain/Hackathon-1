---
sidebar_position: 5
---

# Chapter 4: Actuation and Control

Actuation is how a robot translates its "thoughts" into physical actions. This chapter covers the motors that drive humanoid movement and the control algorithms that keep them stable.

## Humanoid Actuators

Humanoids require high torque-to-weight ratios and back-drivability.
- **Electric Motors (BLDC)**: Most common in modern humanoids (e.g., Tesla Optimus, Figure 01). They are precise and efficient.
- **Harmonic Drives**: Specialized gearboxes that provide high torque in a compact form factor.
- **Hydraulic Actuators**: Used in robots like Boston Dynamics' Atlas for explosive power and impact resistance.

## Control Loops

Traditional control hierarchy consists of:
1. **High-Level Planning**: Deciding where to walk.
2. **Mid-Level MPC (Model Predictive Control)**: Calculating a stable trajectory over the next few seconds.
3. **Low-Level PID Control**: Maintaining the specific velocity or position of an individual motor.

## Reinforcement Learning for Locomotion

Recently, RL has replaced traditional control for complex tasks like walking on uneven terrain. By training in simulation (e.g., NVIDIA Isaac Gym), robots learn robust gaits that can recover from kicks or slips.

## Compliance and Safety

Humanoids must be "compliant"—meaning they should yield slightly when they hit something. This is achieved through:
- **Series Elastic Actuators (SEA)**: Adding a spring between the motor and the joint.
- **Impedance Control**: Using software to simulate spring-like behavior in the motors.
