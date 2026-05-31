import { ComponentProps } from "react";

import {
  Trello,
  GraduationCap,
  CheckSquare,
  Languages,
  ChevronRight,
  BookOpen,
  Sparkles,
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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ROUTES } from "../constants/routes";

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const navItems = [
    {
      title: "Task Board",
      url: ROUTES.TASKS,
      icon: Trello,
    },
    {
      title: "Learning Path",
      url: ROUTES.LEARNING_PATHS,
      icon: GraduationCap,
    },
    {
      title: "Habit Tracker",
      url: ROUTES.HABITS,
      icon: CheckSquare,
      isComingSoon: true,
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
        },
        {
          title: "Leitner Box",
          url: ROUTES.LEITNER,
          icon: Sparkles,
          isComingSoon: true,
        },
      ],
    },
  ];
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="border rounded-md border-gray-300 px-3 py-2">
            Stratum Spectrum
          </SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
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
                  <SidebarMenuButton asChild tooltip={item.title}>
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

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
