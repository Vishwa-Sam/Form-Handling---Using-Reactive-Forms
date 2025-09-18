# Angular Reactive Forms Project

---

## Overview
This project demonstrates how to build and manage complex forms in Angular using Reactive Forms, also known as model-driven forms. It covers key reactive form concepts including:

Creating forms programmatically with FormGroup, FormControl, and FormArray

Setting up custom validators for form inputs

Performing input validation reactively in the TypeScript class

Nesting form groups to create hierarchical form structures

Using form arrays to dynamically manage collections of controls

Leveraging Angular's ReactiveFormsModule for reactive form directives and functions

This project is ideal for learning how to use Angular’s reactive forms API to build scalable, maintainable, and dynamic forms with strict validation and clear data flow.

---

## Features
Reactive form model created in the component using FormGroup, FormControl, and FormArray

Custom synchronous validators to enforce business rules

Reactive input validation with real-time feedback

Nested form groups representing sub-sections of a form

Dynamic form arrays allowing add/remove of controls at runtime

Angular's ReactiveFormsModule imported to leverage reactive form capabilities

Form control states tracked with observables for validation status and value changes

---

## Core Concepts Explained
Reactive Forms Architecture
The form model, including all controls and groups, is explicitly created in the component TypeScript file.

The form model is built using new FormGroup(), with nested FormControl and FormArray instances describing individual fields or dynamic arrays of fields.

Validation rules are assigned per control or group using built-in and custom validators.

The template binds to the form model using the [formGroup] directive and individual controls use formControlName.

Angular manages form state reactively using observables, allowing subscription to changes and dynamic logic.

Custom Validators
Custom synchronous validators are functions that take a control and return either null (valid) or an error object.

These validators are attached to form controls or groups to implement any specific validation logic beyond built-in Angular validators.

Nested FormGroups
Forms can be structured hierarchically with nested FormGroup instances to represent logical subsections.

This allows modeling complex forms with nested data structure.

FormArrays
FormArray is a reactive form collection type enabling dynamic addition and removal of controls or groups.

Useful for lists of inputs such as multiple skills, addresses, or phone numbers.

Custom Validator Factory Functions
To create reusable and configurable validators, factory functions return validator functions that Angular calls during validation. This pattern allows passing parameters to tailor validation logic.

---

## Conclusion
This project illustrates how Angular Reactive Forms empower developers to build complex, validated, and dynamic forms with a clear programmatic model. Reactive forms support custom validation, nested groups, and dynamic arrays with simple and powerful APIs. This leads to better maintainability, testability, and flexibility compared to template-driven forms.
