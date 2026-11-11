"use client";

import { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSelectedLayoutSegments } from "next/navigation";

import {
  Trello,
  GraduationCap,
  CheckSquare,
  Languages,
  ChevronRight,
  BookOpen,
  Sparkles,
  ClockPlus,
  ListRestart,
  Landmark,
  HardDrive,
  Sun,
  TriangleAlert,
  CalendarArrowUp,
  Star,
  CheckCircle,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ROUTES } from "../constants/routes";
import { cn } from "@/lib/utils";

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
  footer?: ReactNode;
};

const AppSidebar = ({ footer, ...props }: AppSidebarProps) => {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const view = segments.at(-1) ?? "overview";
  const isActive = (key: string) => segments.join("/").startsWith(key);

  const navItems = [
    {
      title: "Task Management",
      icon: Trello,
      subItems: [
        {
          title: "All tasks",
          url: ROUTES.TASKS("all", view),
          icon: HardDrive,
          isActive,
        },
        {
          title: "Today",
          url: ROUTES.TASKS("today", view),
          icon: Sun,
          isActive,
        },
        {
          title: "Upcoming",
          url: ROUTES.TASKS("upcoming", view),
          icon: CalendarArrowUp,
          isActive,
        },
        {
          title: "Overdue",
          url: ROUTES.TASKS("overdue", view),
          icon: TriangleAlert,
          isActive,
        },
        {
          title: "Starred",
          url: ROUTES.TASKS("starred", view),
          icon: Star,
          isActive,
        },
        {
          title: "Completed",
          url: ROUTES.TASKS("completed", view),
          icon: CheckCircle,
          isActive,
        },
      ],
    },
    {
      title: "Learning Path",
      url: ROUTES.LEARNING_PATHS,
      icon: GraduationCap,
    },
    {
      title: "Budget Tracker",
      icon: Landmark,
      url: ROUTES.BUDGET_TRACKER,
    },
    {
      title: "Habit Tracker",
      icon: CheckSquare,
      isComingSoon: true,
      subItems: [
        {
          title: "New Habit",
          url: ROUTES.HABITS_NEW,
          icon: ClockPlus,
          isActive,
        },
        {
          title: "Habits List",
          url: ROUTES.HABITS_LIST,
          icon: ListRestart,
          isActive,
        },
      ],
    },
    {
      title: "Language Learning",
      url: "/language",
      icon: Languages,
      isActive: true,
      subItems: [
        {
          title: "Dictionary",
          url: ROUTES.DICTIONARY,
          icon: BookOpen,
          isActive,
        },
        {
          title: "Leitner Box",
          url: ROUTES.LEITNER,
          icon: Sparkles,
          isComingSoon: true,
          isActive,
        },
      ],
    },
  ];
  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className="font-mono text-[#0F172A]"
      {...props}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex gap-2 items-center my-3">
            <Image src="/logo.svg" alt="logo" width={58} height={58} />
            <div className="flex flex-col text-[#0F172A]">
              <span className="font-bold">Stratum</span>
              <span>Spectrum</span>
            </div>
          </SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const hasActiveSubItem = item.subItems?.some(
                (sub) => sub.url === pathname,
              );

              const isActive = item.url === pathname || hasActiveSubItem;

              if (item.subItems) {
                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger
                        asChild
                        className={cn(
                          "cursor-pointer",
                          isActive
                            ? "text-green-accent-600 hover:text-green-accent-600"
                            : "",
                        )}
                      >
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  {subItem.icon && (
                                    <subItem.icon className="h-4 w-4" />
                                  )}
                                  <span>{subItem.title}</span>
                                  {subItem.isComingSoon && (
                                    <SidebarMenuBadge className="text-[10px] bg-muted text-muted-foreground">
                                      Soon
                                    </SidebarMenuBadge>
                                  )}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      isActive
                        ? "text-green-accent-600 hover:text-green-accent-600"
                        : "",
                    )}
                  >
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.isComingSoon && (
                    <SidebarMenuBadge className="text-[10px] bg-muted text-muted-foreground">
                      Soon
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {footer && <SidebarFooter>{footer}</SidebarFooter>}
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
