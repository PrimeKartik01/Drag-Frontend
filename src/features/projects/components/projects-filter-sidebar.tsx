import { useMemo, useState } from "react";
import { ChevronDown, Filter, Search, X } from "lucide-react";

import type { Project } from "@/types/project";

interface ProjectsFilterSidebarProps {
  projects: Project[];
  search: string;
  selectedCities: string[];
  selectedCategories: string[];
  selectedPropertyTypes: string[];
  selectedStatuses: string[];
  selectedHighlights: string[];
  setSearch: (value: string) => void;
  setSelectedCities: (values: string[]) => void;
  setSelectedCategories: (values: string[]) => void;
  setSelectedPropertyTypes: (values: string[]) => void;
  setSelectedStatuses: (values: string[]) => void;
  setSelectedHighlights: (values: string[]) => void;
}

interface FilterOption {
  value: string;
  label?: string;
  count: number;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}

function getOptions(
  projects: Project[],
  getValue: (project: Project) => string | null | undefined,
) {
  const counts = new Map<string, number>();

  projects.forEach((project) => {
    const value = getValue(project)?.trim();
    if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
  });

  return [...counts].map(([value, count]) => ({ value, count }));
}

function getHighlightOptions(projects: Project[]): FilterOption[] {
  const counts = new Map<string, FilterOption>();

  projects.forEach((project) => {
    const projectHighlights = new Map<string, string>();
    project.highlights?.forEach(({ name, slug }) => {
      const value = slug.trim();
      const label = name.trim();
      if (value && label) projectHighlights.set(value, label);
    });

    projectHighlights.forEach((label, value) => {
      const option = counts.get(value);
      counts.set(value, {
        value,
        label,
        count: (option?.count ?? 0) + 1,
      });
    });
  });

  return [...counts.values()];
}

function FilterGroup({
  title,
  options,
  selected,
  onChange,
}: FilterGroupProps) {
  const toggleOption = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  };

  if (options.length === 0) return null;

  return (
    <fieldset className="px-4 py-3">
      <legend className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </legend>
      <div className="space-y-1">
        {options.map(({ value, label, count }) => (
          <label
            key={value}
            className="flex cursor-pointer items-center gap-2 text-xs text-slate-700"
          >
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => toggleOption(value)}
              className="size-3.5 rounded border-slate-300 accent-amber-600"
            />
            <span className="min-w-0 flex-1">{label ?? value}</span>
            <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
              {count}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ProjectsFilterSidebar({
  projects,
  search,
  selectedCities,
  selectedCategories,
  selectedPropertyTypes,
  selectedStatuses,
  selectedHighlights,
  setSearch,
  setSelectedCities,
  setSelectedCategories,
  setSelectedPropertyTypes,
  setSelectedStatuses,
  setSelectedHighlights,
}: ProjectsFilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const cities = useMemo(
    () => getOptions(projects, (project) => project.city?.name),
    [projects],
  );
  const categories = useMemo(
    () => getOptions(projects, (project) => project.property_category?.name),
    [projects],
  );
  const propertyTypes = useMemo(
    () => getOptions(projects, (project) => project.property_type?.name),
    [projects],
  );
  const statuses = useMemo(
    () => getOptions(projects, (project) => project.project_status),
    [projects],
  );
  const highlights = useMemo(() => getHighlightOptions(projects), [projects]);

  const activeFilterCount =
    selectedCities.length +
    selectedCategories.length +
    selectedPropertyTypes.length +
    selectedStatuses.length +
    selectedHighlights.length;

  const clearFilters = () => {
    setSearch("");
    setSelectedCities([]);
    setSelectedCategories([]);
    setSelectedPropertyTypes([]);
    setSelectedStatuses([]);
    setSelectedHighlights([]);
  };

  return (
    <aside className="pt-3 w-full shrink-0 lg:mb-0 lg:w-[260px]">
      <button
        type="button"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((open) => !open)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 lg:hidden"
      >
        <span className="flex items-center gap-2">
          <Filter className="size-4 text-amber-600" />
          Filters
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
              {activeFilterCount}
            </span>
          )}
        </span>
        <ChevronDown
          className={`size-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`${mobileOpen ? "block" : "hidden"} mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:mt-0 lg:block`}
      >
        <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3 text-xs font-semibold text-slate-800">
          <Filter className="size-3.5 text-amber-600" />
          Filters
        </div>

        <div className="border-slate-100 px-4 py-3">
          <label
            htmlFor="project-filter-search"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-slate-500"
          >
            Search
          </label>
          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5">
            <Search className="size-3.5 shrink-0 text-slate-400" />
            <input
              id="project-filter-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, builder..."
              className="min-w-0 flex-1 bg-transparent py-2 text-xs outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <FilterGroup
          title="City"
          options={cities}
          selected={selectedCities}
          onChange={setSelectedCities}
        />
        <FilterGroup
          title="Category"
          options={categories}
          selected={selectedCategories}
          onChange={setSelectedCategories}
        />
        <FilterGroup
          title="Property Type"
          options={propertyTypes}
          selected={selectedPropertyTypes}
          onChange={setSelectedPropertyTypes}
        />
        <FilterGroup
          title="Status"
          options={statuses}
          selected={selectedStatuses}
          onChange={setSelectedStatuses}
        />
        <FilterGroup
          title="Highlights"
          options={highlights}
          selected={selectedHighlights}
          onChange={setSelectedHighlights}
        />

        {(search || activeFilterCount > 0) && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex w-full items-center gap-1.5 px-4 py-3 text-xs font-medium text-slate-600 hover:text-amber-700"
          >
            <X className="size-3.5" />
            Clear filters
          </button>
        )}
      </div>
    </aside>
  );
}

export default ProjectsFilterSidebar;
