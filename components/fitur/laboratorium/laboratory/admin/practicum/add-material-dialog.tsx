"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/utilitas/ui/dialog"
import { Button } from "@/utilitas/ui/button"
import { Input } from "@/utilitas/ui/input"
import { Label } from "@/utilitas/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/utilitas/ui/select"
import { mockPracticumCourses } from "./mock-practicum-data"

export default function AddMaterialDialog({ open, onOpenChange, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    course: "",
    quantity: 0,
    unit: "",
    threshold: 5,
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "threshold" ? Number.parseInt(value) : value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({
      name: "",
      category: "",
      course: "",
      quantity: 0,
      unit: "",
      threshold: 5,
      description: "",
    })
    onOpenChange(false)
  }

  const categories = [
    "Electronics",
    "Chemicals",
    "Glassware",
    "Tools",
    "Safety Equipment",
    "Software",
    "Hardware",
    "Books",
    "Other",
  ]

  const units = ["pcs", "sets", "bottles", "boxes", "kg", "g", "L", "mL", "m", "cm"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Material</DialogTitle>
            <DialogDescription>Add a new material to the laboratory inventory.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Material Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={formData.course} onValueChange={(value) => handleSelectChange("course", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {mockPracticumCourses.map((course) => (
                    <SelectItem key={course.id} value={course.name}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={formData.unit} onValueChange={(value) => handleSelectChange("unit", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="threshold">Low Stock Threshold</Label>
                <Input
                  id="threshold"
                  name="threshold"
                  type="number"
                  min="1"
                  value={formData.threshold}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Add Material</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

