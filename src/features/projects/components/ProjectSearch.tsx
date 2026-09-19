import { useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import type { Project } from "@/types/project";

interface ProjectSearchProps {
  projects: Project[];

  search: string;
  city: string;
  state: string;
  propertyCategory: string;
  propertyType: string;
  bhk: string;

  setSearch: (value: string) => void;
  setCity: (value: string) => void;
  setState: (value: string) => void;
  setPropertyCategory: (value: string) => void;
  setPropertyType: (value: string) => void;
  setBhk: (value: string) => void;
}

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className="h-11 w-full justify-between rounded-xl px-4 font-normal"
          />
        }
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || label}
        </span>

        <ChevronDown className="size-4" />
      </PopoverTrigger>

      <PopoverContent className="w-[220px] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />

          <CommandList>
            <CommandEmpty>
              No {label.toLowerCase()} found.
            </CommandEmpty>

            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function ProjectSearch({
  projects,
  search,
  city,
  state,
  propertyCategory,
  propertyType,
  bhk,
  setSearch,
  setCity,
  setState,
  setPropertyCategory,
  setPropertyType,
  setBhk,
}: ProjectSearchProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const cities = useMemo(() => {
    return [
      ...new Set(
        projects
          .map((project) => project.city?.name)
          .filter((value): value is string => Boolean(value))
      ),
    ];
  }, [projects]);

  const states = useMemo(() => {
    return [
      ...new Set(
        projects
          .map((project) => project.state?.name)
          .filter((value): value is string => Boolean(value))
      ),
    ];
  }, [projects]);

  const propertyCategories = useMemo(() => {
    return [
      ...new Set(
        projects
          .map((project) => project.property_category?.name)
          .filter((value): value is string => Boolean(value))
      ),
    ];
  }, [projects]);

  const propertyTypes = useMemo(() => {
    return [
      ...new Set(
        projects
          .map((project) => project.property_type?.name)
          .filter((value): value is string => Boolean(value))
      ),
    ];
  }, [projects]);

  const bhks = useMemo(() => {
    return [
      ...new Set(
        projects
          .map((project) => project.bhk)
          .filter((value): value is string => Boolean(value))
      ),
    ];
  }, [projects]);

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setState("");
    setPropertyCategory("");
    setPropertyType("");
    setBhk("");
    setSearchOpen(false);
  };

  const hasFilters =
    search ||
    city ||
    state ||
    propertyCategory ||
    propertyType ||
    bhk;

  return (
    <div className="w-full space-y-3">
      {/* Main Search */}
      <Command>
        <CommandInput
          placeholder="Search project, city or builder..."
          value={search}
          onValueChange={(value) => {
            setSearch(value);
            setSearchOpen(value.trim().length > 0);
          }}
        />

        {searchOpen && search.trim() && (
          <CommandList>
            <CommandEmpty>No projects found.</CommandEmpty>

            <CommandGroup heading="Projects">
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={`${project.name} ${
                    project.city?.name ?? ""
                  } ${project.builder?.name ?? ""}`}
                  onSelect={() => {
                    setSearch(project.name);
                    setSearchOpen(false);
                  }}
                >
                  <Search className="mr-2 size-4" />

                  <div className="flex flex-col">
                    <span>{project.name}</span>

                    <span className="text-xs text-muted-foreground">
                      {project.city?.name ?? "Location not available"}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <FilterDropdown
          label="City"
          value={city}
          options={cities}
          onChange={setCity}
        />

        <FilterDropdown
          label="State"
          value={state}
          options={states}
          onChange={setState}
        />

        <FilterDropdown
          label="Category"
          value={propertyCategory}
          options={propertyCategories}
          onChange={setPropertyCategory}
        />

        <FilterDropdown
          label="Property Type"
          value={propertyType}
          options={propertyTypes}
          onChange={setPropertyType}
        />

        <FilterDropdown
          label="BHK"
          value={bhk}
          options={bhks}
          onChange={setBhk}
        />
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="gap-2 px-2"
        >
          <X className="size-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}

export default ProjectSearch;