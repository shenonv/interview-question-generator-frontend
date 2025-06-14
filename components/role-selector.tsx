"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronsUpDown, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { jobRoles } from "@/lib/mock-data"
import { useInterviewStore } from "@/lib/store"

interface RoleSelectorProps {
  selectedRole: string
  onRoleSelect: (role: string) => void
}

export function RoleSelector({ selectedRole, onRoleSelect }: RoleSelectorProps) {
  const [open, setOpen] = useState(false)
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [customRole, setCustomRole] = useState("")
  const [error, setError] = useState("")
  const { customRoles, addCustomRole, removeCustomRole } = useInterviewStore()

  // Combine default roles with custom roles
  const allRoles = [...jobRoles, ...customRoles]

  const handleAddCustomRole = () => {
    setError("")

    if (!customRole.trim()) {
      setError("Please enter a role name")
      return
    }

    if (customRole.trim().length < 2) {
      setError("Role name must be at least 2 characters")
      return
    }

    if (allRoles.some((role) => role.toLowerCase() === customRole.trim().toLowerCase())) {
      setError("This role already exists")
      return
    }

    addCustomRole(customRole.trim())
    onRoleSelect(customRole.trim())
    setCustomRole("")
    setShowCustomForm(false)
    setOpen(false)
  }

  const handleRemoveCustomRole = (roleToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation()
    removeCustomRole(roleToRemove)
    if (selectedRole === roleToRemove) {
      onRoleSelect("")
    }
  }

  const isCustomRole = (role: string) => customRoles.includes(role)

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedRole || "Select a job role..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search job roles..." />
            <CommandList>
              <CommandEmpty>
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 mb-2">No job role found.</p>
                  <Button variant="outline" size="sm" onClick={() => setShowCustomForm(true)} className="text-xs">
                    <Plus className="mr-1 h-3 w-3" />
                    Add Custom Role
                  </Button>
                </div>
              </CommandEmpty>

              {/* Default Roles */}
              <CommandGroup heading="Popular Roles">
                {jobRoles.map((role) => (
                  <CommandItem
                    key={role}
                    value={role}
                    onSelect={(currentValue) => {
                      onRoleSelect(currentValue === selectedRole ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", selectedRole === role ? "opacity-100" : "opacity-0")} />
                    {role}
                  </CommandItem>
                ))}
              </CommandGroup>

              {/* Custom Roles */}
              {customRoles.length > 0 && (
                <CommandGroup heading="Your Custom Roles">
                  {customRoles.map((role) => (
                    <CommandItem
                      key={role}
                      value={role}
                      onSelect={(currentValue) => {
                        onRoleSelect(currentValue === selectedRole ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", selectedRole === role ? "opacity-100" : "opacity-0")} />
                      <span className="flex-1">{role}</span>
                      <Badge variant="secondary" className="text-xs mr-2">
                        Custom
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-red-100 hover:text-red-600"
                        onClick={(e) => handleRemoveCustomRole(role, e)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Add Custom Role Button */}
              <CommandGroup>
                <CommandItem onSelect={() => setShowCustomForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Custom Role
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Custom Role Form */}
      {showCustomForm && (
        <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="custom-role" className="text-sm font-medium">
                Add Custom Job Role
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowCustomForm(false)
                  setCustomRole("")
                  setError("")
                }}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Input
              id="custom-role"
              placeholder="e.g., AI/ML Engineer, Blockchain Developer"
              value={customRole}
              onChange={(e) => {
                setCustomRole(e.target.value)
                setError("")
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddCustomRole()
                }
                if (e.key === "Escape") {
                  setShowCustomForm(false)
                  setCustomRole("")
                  setError("")
                }
              }}
              className="text-sm"
            />

            {error && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button onClick={handleAddCustomRole} size="sm" className="flex-1">
                <Plus className="mr-1 h-3 w-3" />
                Add Role
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowCustomForm(false)
                  setCustomRole("")
                  setError("")
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Display selected custom role info */}
      {selectedRole && isCustomRole(selectedRole) && (
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Custom Role
            </Badge>
            <span className="text-sm text-green-800 dark:text-green-200">
              You've selected your custom role: <strong>{selectedRole}</strong>
            </span>
          </div>
          <p className="text-xs text-green-700 dark:text-green-300 mt-1">
            You'll receive general interview questions that can be adapted to this role.
          </p>
        </div>
      )}

      {/* Show custom roles count */}
      {customRoles.length > 0 && (
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            You have {customRoles.length} custom role{customRoles.length !== 1 ? "s" : ""} saved
          </p>
        </div>
      )}
    </div>
  )
}
