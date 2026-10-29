import { useMemo, useState } from "react";
import { ChevronDown, Search, X } from "@/assets/icons/icons";

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
          <Button className="h-7 w-full justify-between rounded-xl px-4 font-normal" />
        }
      >
        <span
          className={`min-w-0 truncate text-sm text-gray-700 ${value ? "text-foreground" : "text-muted-foreground"}`}
        >
          {value || label}
        </span>

        <ChevronDown className="size-4" />
      </PopoverTrigger>

      <PopoverContent className="w-[220px] p-0 p-2 bg-white ring-0" align="start">
        <Command  >
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />

          <CommandList>
            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>

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
          .filter((value): value is string => Boolean(value)),
      ),
    ];
  }, [projects]);

  const states = useMemo(() => {
    return [
      ...new Set(
        projects
          .map((project) => project.state?.name)
          .filter((value): value is string => Boolean(value)),
      ),
    ];
  }, [projects]);

  const propertyCategories = useMemo(() => {
    return [
      ...new Set(
        projects
          .map((project) => project.property_category?.name)
          .filter((value): value is string => Boolean(value)),
      ),
    ];
  }, [projects]);

  const propertyTypes = useMemo(() => {
    return [
      ...new Set(
        projects
          .map((project) => project.property_type?.name)
          .filter((value): value is string => Boolean(value)),
      ),
    ];
  }, [projects]);

  const bhks = useMemo(() => {
    return [
      ...new Set(
        projects
          .map((project) => project.bhk)
          .filter((value): value is string => Boolean(value)),
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
    search || city || state || propertyCategory || propertyType || bhk;

  return (
    <div className="absolute bg-white inset-x-4 bottom-15 z-10 mx-auto w-auto max-w-5xl min-w-0 rounded-xl border border-white/30 font-inter shadow-xl">
      {/* Main Search */}
      <Command className="min-w-0 p-3">
        <CommandInput
          placeholder="Find Your Homes"
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
      <div className=" md:grid min-w-0 grid-cols-1 gap-3 border-t border-gray-400 px-3 py-1 sm:grid-cols-2 md:grid-cols-5 hidden">
        <div className="min-w-0 py-1 border-r border-gray-400">
          <FilterDropdown
            label="City"
            value={city}
            options={cities}
            onChange={setCity}
          />
        </div>

        <div className="min-w-0 py-1 border-r border-gray-400">
          <FilterDropdown
            label="State"
            value={state}
            options={states}
            onChange={setState}
          />
        </div>

        <div className="min-w-0 py-1 border-r border-gray-400">
          <FilterDropdown
            label="Category"
            value={propertyCategory}
            options={propertyCategories}
            onChange={setPropertyCategory}
          />
        </div>

        <div className="min-w-0 py-1 border-r border-gray-400">
          <FilterDropdown
            label="Property Type"
            value={propertyType}
            options={propertyTypes}
            onChange={setPropertyType}
          />
        </div>

        {/* BHK + Partition */}
        <div className="min-w-0 py-1">
          <FilterDropdown
            label="BHK"
            value={bhk}
            options={bhks}
            onChange={setBhk}
          />
        </div>
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <Button variant="ghost" onClick={clearFilters} className="gap-2 px-2 text-xs md:text-sm">
          <X className="size-3" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}

export default ProjectSearch;
